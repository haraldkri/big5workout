import fs from 'fs';
import {fileURLToPath} from 'url';
import path, {dirname} from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function findMissingTranslationKeys(folderPath, additionalKeysToCheck) {
    // Get a list of all JSON files in the folder
    const jsonFiles = fs.readdirSync(folderPath)
        .filter(file => path.extname(file) === '.json');

    // Initialize the result object
    const result = {};

    // Read each JSON file and compare its keys to those of the other files
    for (const fileName of jsonFiles) {
        const filePath = path.join(folderPath, fileName);
        const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        // Check if each key is present in the other files and the additional keys
        const otherKeys = {};
        for (const otherFileName of jsonFiles) {
            if (otherFileName !== fileName) {
                const otherFilePath = path.join(folderPath, otherFileName);
                const otherJsonData = JSON.parse(fs.readFileSync(otherFilePath, 'utf8'));
                for (const key of Object.keys(otherJsonData)) {
                    if (!jsonData.hasOwnProperty(key)) {
                        otherKeys[key] = true;
                    }
                }
            }
        }

        // Add the additional keys to check
        for (const key of additionalKeysToCheck) {
            if (!jsonData.hasOwnProperty(key)) {
                otherKeys[key] = true;
            }
        }

        // Add the file name and other keys to the result object
        result[fileName] = {
            missingKeyCount: Object.keys(otherKeys).length,
            missingKeys: Object.keys(otherKeys)
        };
    }

    return result;
}


function scanFolderForTranslationKeys(relativeFolderPath) {
    const srcPath = path.join(__dirname, relativeFolderPath); // Assuming the script is in the root directory

    function findStringArgs() {
        const stringArgs = [];

        // Recursively read all .tsx files in the src directory and its subdirectories
        function readDir(dirPath) {
            const files = fs.readdirSync(dirPath);
            for (const file of files) {
                const filePath = path.join(dirPath, file);
                const stat = fs.statSync(filePath);
                if (stat.isDirectory()) {
                    readDir(filePath);
                } else if (stat.isFile() && path.extname(filePath) === '.tsx') {
                    const content = fs.readFileSync(filePath, 'utf8');
                    // Find all t() calls with string arguments
                    const re = /[\s{([]t\(['"](.+?)['"]\)/g;
                    let match;
                    while ((match = re.exec(content))) {
                        stringArgs.push(match[1]);
                    }
                }
            }
        }

        readDir(srcPath);
        return stringArgs;
    }

    const stringArgs = findStringArgs();
    return stringArgs;
}

function main(scanSrcFolder, scanOtherProjects) {
    let allFoundTranslationKeys = [];
    if (scanSrcFolder) {
        const scanFolder = "../../src";
        allFoundTranslationKeys = scanFolderForTranslationKeys(scanFolder);
        console.log(`All translation keys that where found to be used in the src folder: (count: ${allFoundTranslationKeys.length})`, allFoundTranslationKeys);
    }

    const folderPath = './locale';
    const missingTranslations = findMissingTranslationKeys(folderPath, allFoundTranslationKeys);
    console.log("\nAll translation keys that are not yet implemented: ", missingTranslations);
}

main(true, false);

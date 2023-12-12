import {google} from "googleapis";
import ServiceAccount from "../../../credentials/serviceAccount.json";
import {firestore} from "firebase-admin";
import Firestore = firestore.Firestore;

export {ServiceAccount};

export const SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive"
];

export async function createRecordsSheet(firestore: Firestore, auth: any, uid: string) {
    const sheets = google.sheets({version: "v4", auth});
    const recordsData = await getUserRecordsData(firestore, uid);

    console.info("recordsData", recordsData)

    return sheets.spreadsheets.create({
        requestBody: {

            properties: {
                title: "Exercise Records",
            },
            sheets: Object.keys(recordsData).map((exerciseId) => {
                return {
                    properties: {
                        title: exerciseId,
                    },
                    data: [
                        {
                            rowData: [
                                {
                                    values: [
                                        {
                                            userEnteredValue: {
                                                stringValue: "Timestamp",
                                            },
                                        },
                                        {
                                            userEnteredValue: {
                                                stringValue: "Weight",
                                            },
                                        },
                                        {
                                            userEnteredValue: {
                                                stringValue: "Duration",
                                            },
                                        },
                                    ],
                                },
                                ...recordsData[exerciseId].map((record: any) => {
                                    return {
                                        values: [
                                            {
                                                userEnteredValue: {
                                                    numberValue: record.timestamp,
                                                },
                                            },
                                            {
                                                userEnteredValue: {
                                                    numberValue: record.weight,
                                                },
                                            },
                                            {
                                                userEnteredValue: {
                                                    numberValue: record.duration,
                                                },
                                            },
                                        ],
                                    };
                                }),
                            ],
                        },
                    ],
                };
            }),
        },
    });
}

/**
 * Creates a new google sheet and returns the URL
 */
export async function createNewGoogleSheet(firestore: Firestore, auth: any, uid: string) {
    const spreadsheet = await createRecordsSheet(firestore, auth, uid);
    const {spreadsheetId, spreadsheetUrl} = spreadsheet.data;

    if (!spreadsheetId || !spreadsheetUrl) throw new Error("Sheet ID not found");
    console.info("Spreadsheet created: ", spreadsheetId);

    // Schedule deletion of the sheet after 1 hour using setTimeout
    setTimeout(async () => {
        deleteSheetById(firestore, uid, auth, spreadsheetId)
            .then(() => {
                console.info("Sheet deleted successfully.");
            })
            .catch((error: any) => {
                console.error("Error deleting google sheet:", error);
            });
    }, 60 * 60 * 1000);

    return {
        spreadsheetId,
        spreadsheetUrl
    };
}

async function deleteSheetById(firestore: Firestore, uid: string, auth: any, sheetId: string) {
    // Delete the file
    const drive = google.drive({version: "v3", auth});
    const response = await drive.files.delete({
        fileId: sheetId,
    });
    if (!(response.status >= 200 && response.status < 300)) throw new Error("Error deleting sheet");


    // Delete the sheet from the user document
    firestore.doc(`users/${uid}`).update({
        sheet: null,
    })
        .then((res) => console.log("Removed spreadsheet link from user", res))
        .catch((err) => console.log("error removing spreadsheet link from user", err));
}

// Adds a new sheet to the user document in firestore
export async function addSheetToUser(firestore: Firestore, sheetData: {
    spreadsheetId: string,
    spreadsheetUrl: string
}, uid: string, auth: any) {
    // get the email of the user
    const user = await firestore.doc(`users/${uid}`).get();
    const email = user.data()?.email;

    // give the user read access to the sheet
    const drive = google.drive({version: "v3", auth: auth});
    drive.permissions.create({
        requestBody: {
            type: 'user',
            role: 'reader', // 'writer', 'reader', 'owner', etc.
            emailAddress: email,
        },
        fileId: sheetData.spreadsheetId,
        fields: "id",
    }).then((res) => {
        if (!res.data.id) throw new Error("Error adding user read permission to sheet");
    });

    // set the sheet url in the user document
    firestore.doc(`users/${uid}`).update({
        sheet: {
            url: sheetData.spreadsheetUrl,
            createdAt: new Date().getTime(),
        },
    }).catch((err) => console.log("error adding sheet to user", err));
}

type RecordData = { [exerciseId: string]: object[] }

async function getUserRecordsData(firestore: Firestore, uid: string) {
    const recordsData: RecordData = {};

    const exercisesSnapshot = await firestore.collection(`users/${uid}/exercises`).get();

    for (const doc of exercisesSnapshot.docs) {
        const exerciseId = doc.id;
        const recordSnapshot = await firestore
            .collection(`users/${uid}/exercises/${exerciseId}/records`)
            .orderBy("timestamp", "desc")
            .get();

        recordsData[exerciseId] = [];

        for (const record of recordSnapshot.docs) {
            const {timestamp, weight, duration} = record.data();
            if (Number.isFinite(timestamp) && Number.isFinite(weight) && Number.isFinite(duration)) {
                recordsData[exerciseId].push(record.data());
            }
        }
    }

    return recordsData;
}

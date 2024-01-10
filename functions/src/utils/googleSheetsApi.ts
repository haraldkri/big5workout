import ServiceAccount from "../../../credentials/serviceAccount.json";
import {firestore} from "firebase-admin";
import {CloudTasksClient} from "@google-cloud/tasks";
import {google as googleCloud} from "@google-cloud/tasks/build/protos/protos";
import {google} from "googleapis";
import moment from "moment";
import Firestore = firestore.Firestore;
import ITask = googleCloud.cloud.tasks.v2.ITask;

export {ServiceAccount};

async function createRecordsSheet(firestore: Firestore, auth: any, uid: string) {
    const sheets = google.sheets({version: "v4", auth});
    const recordsData = await getUserRecordsData(firestore, uid);

    const spreadsheet = sheets.spreadsheets.create({
        requestBody: {
            properties: {
                title: "Exercise Records",
            },
            sheets: Object.keys(recordsData).map((exerciseId) => {
                const exerciseData = recordsData[exerciseId];

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
                                                stringValue: "Date",
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
                                ...exerciseData.map((record: any) => {
                                    return {
                                        values: [
                                            {
                                                userEnteredValue: {
                                                    stringValue: moment(record.timestamp).format("DD/MM/YYYY"),
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

    const {spreadsheetId, spreadsheetUrl, sheets: sheetPages} = (await spreadsheet).data;

    if (!spreadsheetId || !spreadsheetUrl) throw new Error("Error while creating sheet. SpreadsheetId or SpreadsheetUrl is undefined");
    else console.info("Sheet created successfully.");

    // Add the charts to the sheets
    try {
        const response = await sheets.spreadsheets.batchUpdate({
            spreadsheetId,
            requestBody: {
                requests: sheetPages?.map((sheetPage) => {
                    const id = sheetPage.properties?.sheetId;
                    const exerciseId = sheetPage.properties?.title;
                    if (!id || !exerciseId) throw new Error("Error while adding charts to sheets. SheetId or ExerciseId is undefined");
                    const exerciseData = recordsData[exerciseId];

                    return {
                        addChart: {
                            chart: {
                                position: {
                                    overlayPosition: {
                                        anchorCell: {
                                            sheetId: id,
                                            rowIndex: 1,
                                            columnIndex: 4,
                                        },
                                    },
                                },
                                spec: {
                                    title: exerciseId,
                                    basicChart: {
                                        chartType: "COMBO",
                                        legendPosition: "BOTTOM_LEGEND",
                                        headerCount: 1,
                                        axis: [
                                            {
                                                position: "BOTTOM_AXIS",
                                                title: "Time",
                                            },
                                            {
                                                position: "LEFT_AXIS",
                                                title: "Weight",
                                            },
                                            {
                                                position: "RIGHT_AXIS",
                                                title: "Duration",
                                            },
                                        ],
                                        // what are domains? https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/charts#basicchartdomain
                                        "domains": [
                                            {
                                                "domain": {
                                                    "sourceRange": {
                                                        "sources": [{
                                                            "sheetId": id,
                                                            "startRowIndex": 0,
                                                            "endRowIndex": exerciseData.length + 1,
                                                            "startColumnIndex": 0,
                                                            "endColumnIndex": 1,
                                                        }]
                                                    },
                                                }
                                            }
                                        ],
                                        series: [
                                            {
                                                series: {
                                                    sourceRange: {
                                                        sources: [
                                                            {
                                                                startRowIndex: 0,
                                                                endRowIndex: exerciseData.length + 1,
                                                                startColumnIndex: 1, // Adjusted to start from weight values
                                                                endColumnIndex: 2,
                                                                sheetId: id,
                                                            },
                                                        ],
                                                    },
                                                },
                                                targetAxis: "LEFT_AXIS", // Weight values mapped to the left axis
                                                type: "LINE",
                                            },
                                            {
                                                series: {
                                                    sourceRange: {
                                                        sources: [
                                                            {
                                                                startRowIndex: 0,
                                                                endRowIndex: exerciseData.length + 1,
                                                                startColumnIndex: 2, // Duration values
                                                                endColumnIndex: 3,
                                                                sheetId: id,
                                                            },
                                                        ],
                                                    },
                                                },
                                                colorStyle: {
                                                    rgbColor: {
                                                        // alpha is not supported hence the grey color, see: https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/other#colorstyle
                                                        red: 0.85,
                                                        green: 0.85,
                                                        blue: 0.85,
                                                    }
                                                },
                                                targetAxis: "RIGHT_AXIS",
                                                type: "COLUMN",
                                            }
                                        ],
                                    },
                                },
                            },
                        },
                    };
                }),
            },
        });

        console.info("Charts added to sheets", response);

    } catch (e) {
        console.error("Error adding charts to sheets", e);
    }

    return spreadsheet
}

async function scheduleSheetDeletion(firestore: Firestore, uid: string, spreadsheetId: string) {
    // Instantiates a client.
    const client = new CloudTasksClient();
    const project = ServiceAccount.project_id;
    const region = 'europe-west3';
    const queue = 'sheet-deletion-queue';
    const location = 'europe-west3';
    const url = `https://${region}-${ServiceAccount.project_id}.cloudfunctions.net/deleteUserRecordsSheet`;
    const serviceAccountEmail = ServiceAccount.client_email;
    const payload = JSON.stringify({uid, sheetId: spreadsheetId});

    // Create a timestamp for 1 hour later
    const oneHourLater = new Date();
    oneHourLater.setHours(oneHourLater.getHours() + 1);

    // Construct the fully qualified queue name.
    const parent = client.queuePath(project, location, queue);

    const task: ITask = {
        httpRequest: {
            httpMethod: 'POST',
            url,
            headers: {
                'Content-Type': 'application/json',
            },
            oidcToken: {
                serviceAccountEmail,
            },
        },
        scheduleTime: {
            seconds: oneHourLater.getTime() / 1000,
        }
    };

    if (payload) {
        task.httpRequest!.body = Buffer.from(payload).toString('base64');
    }

    console.log('Sending task:');
    console.log(task);
    // Send create task request.
    const request = {parent: parent, task: task};
    const [response] = await client.createTask(request);
    const name = response.name;
    console.log(`Created task ${name}`);
    return Promise.resolve();
}

/**
 * Creates a new google sheet and returns the URL
 */
export async function createNewGoogleSheet(firestore: Firestore, auth: any, uid: string) {
    const spreadsheet = await createRecordsSheet(firestore, auth, uid);
    const {spreadsheetId, spreadsheetUrl} = spreadsheet.data;
    if (!spreadsheetId || !spreadsheetUrl) throw new Error("Error while creating sheet. SpreadsheetId or SpreadsheetUrl is undefined");
    else console.info("Sheet created successfully.");

    // Schedule deletion of the sheet after 1 hour using setTimeout
    scheduleSheetDeletion(firestore, uid, spreadsheetId)
        .catch((error: any) => {
            console.error("Error scheduling the deletion of google sheet:", error);
        });

    return {
        spreadsheetId,
        spreadsheetUrl
    };
}

export async function deleteSheetById(firestore: Firestore, uid: string, auth: any, sheetId: string) {
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

export async function getUserRecordsData(firestore: Firestore, uid: string) {
    const recordsData: RecordData = {};

    const exercisesSnapshot = await firestore.collection(`users/${uid}/exercises`).get();

    for (const doc of exercisesSnapshot.docs) {
        const exerciseId = doc.id;
        const recordSnapshot = await firestore
            .collection(`users/${uid}/exercises/${exerciseId}/records`)
            .orderBy("timestamp", "asc")
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

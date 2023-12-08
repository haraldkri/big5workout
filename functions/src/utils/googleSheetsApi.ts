import {google} from "googleapis";
import ServiceAccount from "../../../credentials/serviceAccount.json";
import {firestore} from "firebase-admin";
import Firestore = firestore.Firestore;

export {ServiceAccount};

export const SCOPES = [
    'https://www.googleapis.com/auth/spreadsheets'
];

export async function createRecordsSheet(firestore: Firestore, auth: any, uid: string) {
    const sheets = google.sheets({version: 'v4', auth});
    const recordsData = await getUserRecordsData(firestore, uid);

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
                                            }
                                        },
                                        {
                                            userEnteredValue: {
                                                stringValue: "Weight",
                                            }
                                        },
                                        {
                                            userEnteredValue: {
                                                stringValue: "Duration",
                                            }
                                        }
                                    ]
                                },
                                ...recordsData[exerciseId].map((record: any) => {
                                    return {
                                        values: [
                                            {
                                                userEnteredValue: {
                                                    numberValue: record.timestamp,
                                                }
                                            },
                                            {
                                                userEnteredValue: {
                                                    numberValue: record.weight,
                                                }
                                            },
                                            {
                                                userEnteredValue: {
                                                    numberValue: record.duration,
                                                }
                                            }
                                        ]
                                    }
                                })
                            ]
                        }
                    ]
                }
            })
        }
    });
}

/**
 * Creates a new google sheet and returns the URL
 */
export async function createNewGoogleSheet(firestore: Firestore, auth: any, uid: string) {
    const spreadsheet = await createRecordsSheet(firestore, auth, uid)
    const {spreadsheetId, spreadsheetUrl} = spreadsheet.data;

    if (!spreadsheetId || !spreadsheetUrl) throw new Error("Sheet ID not found");
    console.info('Spreadsheet created: ', spreadsheetId);

    // Schedule deletion of the sheet after 1 hour using setTimeout
    setTimeout(async () => {
        deleteSheetById(auth, spreadsheetId)
            .then(() => {
                console.info('Sheet deleted successfully.')
            })
            .catch((error: any) => {
                console.error('Error deleting google sheet:', error)
            });
    }, 60 * 60 * 1000);

    return spreadsheetUrl;
}

async function deleteSheetById(auth: any, sheetId: string) {
    const sheets = google.sheets({version: 'v4', auth});

    await sheets.spreadsheets.batchUpdate(
        {
            spreadsheetId: sheetId,
            requestBody: {
                requests: [{deleteSheet: {sheetId: 0}}]
            }
        }
    )
}

// Adds a new sheet to the user document in firestore
export function addSheetToUser(firestore: Firestore, sheetUrl: string, uid: string) {
    firestore.doc(`users/${uid}`).set({
        sheet: {
            url: sheetUrl,
            createdAt: new Date().getTime(),
        },
    })
        .then((res) => console.log("Added new user", res))
        .catch((err) => console.log("error adding user", err));
}

type RecordData = { [exerciseId: string]: object[] }

async function getUserRecordsData(firestore: Firestore, uid: string) {
    let recordsData: RecordData = {};
    const exercisesSnapshot = await firestore.collection(`users/${uid}/exercises`).get();

    for (const doc of exercisesSnapshot.docs) {
        const exerciseId = doc.id;
        const recordSnapshot = await firestore
            .collection(`users/${uid}/exercises/${exerciseId}/records`)
            .orderBy('timestamp', 'desc')
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

/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {region} from "firebase-functions";
import admin from "firebase-admin";
import addDefaultWorkout, {addDefaultUserInformation} from "./utils/addDefaultData";
import {google} from "googleapis";
import {addSheetToUser, createNewGoogleSheet, deleteSheetById, ServiceAccount} from "./utils/googleSheetsApi";
import {onCall, onRequest} from "firebase-functions/v2/https";
import {logger, pubsub, setGlobalOptions} from "firebase-functions/v2";
import {sendEmail} from "./utils/sendEmails";
import {sanitizeUserInput} from "./utils/sanitizeUserInput";
import disableBilling from "./utils/disableBilling";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

admin.initializeApp();

// declare region for all firebase v2 functions
setGlobalOptions({region: 'europe-west3'});
// create function to declare region for all firebase v1 functions
const regionalFunctions = region("europe-west3");


// Thanks go to minima for explaining how to set up a budget kill switch: https://blog.minimacode.com/cap-firebase-spending/
export const billingMonitor = pubsub.onMessagePublished('billing-kill-budget', async (pubsubMessage) => {
    const rawMessageData = pubsubMessage.data.message.data;
    const pubsubData = JSON.parse(Buffer.from(rawMessageData, 'base64').toString())
    const {costAmount, budgetAmount, currencyCode} = pubsubData

    logger.info(`Project current cost is: ${costAmount}${currencyCode} out of ${budgetAmount}${currencyCode}`)
    if (budgetAmount < costAmount) await disableBilling()

    return null // returns nothing
})

export const createDefaultUserWorkouts = regionalFunctions.auth.user().onCreate((user) => {
    const uid = user.uid;
    addDefaultUserInformation(admin.firestore(), user);
    addDefaultWorkout(admin.firestore(), uid);
    logger.info(`Created default workout for user ${user.displayName}`);
});

export const createUserRecordsSheet = onCall(async (request) => {
    let uid = request.auth?.uid;
    if (!uid) {
        logger.info("User is not defined")
        return {code: 403}
    }
    logger.info("Creating new google sheet for user ", uid);
    try {
        // use service account credentials for authentication
        const auth = new google.auth.GoogleAuth({
            credentials: ServiceAccount,
            scopes: [
                "https://www.googleapis.com/auth/spreadsheets",
                "https://www.googleapis.com/auth/drive"
            ],
        });

        const oAuth2Client = await auth.getClient();

        const sheetData = await createNewGoogleSheet(admin.firestore(), oAuth2Client, uid);

        await addSheetToUser(admin.firestore(), sheetData, uid, oAuth2Client);

        return {code: 200, data: sheetData.spreadsheetUrl};
    } catch (e) {
        console.error("Error creating google sheet", e);
        return {
            code: 500,
            uid,
            error: e
        };
    }
});

// if the name of deleteUserRecordsSheet is changed please also change the name of scheduleSheetDeletion in ./utils/googleSheetsApi.ts -> url
export const deleteUserRecordsSheet = onRequest(async (req, res) => {
    const {uid, sheetId} = req.body;

    const auth = new google.auth.GoogleAuth({
        credentials: ServiceAccount,
        scopes: ["https://www.googleapis.com/auth/drive"],
    });

    const oAuth2Client = await auth.getClient();

    try {
        await deleteSheetById(admin.firestore(), uid, oAuth2Client, sheetId); // Replace YOUR_AUTH with your authentication mechanism
        res.status(200).send('Sheet deleted successfully.');
    } catch (error) {
        console.error("Error deleting google sheet:", error);
        res.status(500).send('Error deleting google sheet.');
    }
});

export const createContactEmail = onCall(async (request) => {
    const {email, name, subject, message} = request.data;
    try {
        await sendEmail(
            sanitizeUserInput(email),
            sanitizeUserInput(name),
            sanitizeUserInput(subject),
            sanitizeUserInput(message)
        );
        return {code: 200};
    } catch (e) {
        console.error("Error sending email", e);
        return {
            code: 500,
            error: e
        };
    }
})
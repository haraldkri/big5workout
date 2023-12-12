/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {auth} from "firebase-functions";
import admin from "firebase-admin";
import addDefaultWorkout, {addDefaultUserInformation} from "./utils/addDefaultData";
import {google} from "googleapis";
import {addSheetToUser, createNewGoogleSheet, SCOPES, ServiceAccount} from "./utils/googleSheetsApi";
import {onCall} from "firebase-functions/v2/https";
import {logger} from "firebase-functions/v2";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

admin.initializeApp();

export const createDefaultUserWorkouts = auth.user().onCreate((user) => {
    const uid = user.uid;
    addDefaultUserInformation(admin.firestore(), user);
    addDefaultWorkout(admin.firestore(), uid);
    logger.info(`Created default workout for user ${user.displayName}`);
});

export const createUserRecordsSheet = onCall(async (request) => {
    const uid = request.auth?.uid;
    if (!uid) {
        logger.info("User is not defined")
        return {code: 403}
    }
    logger.info("Creating new google sheet for user ", uid);
    try {
        // use service account credentials for authentication
        const auth = new google.auth.GoogleAuth({
            credentials: ServiceAccount,
            scopes: SCOPES,
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

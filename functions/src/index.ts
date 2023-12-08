/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {auth, logger} from "firebase-functions";
import admin from "firebase-admin";
import addDefaultWorkout, {addDefaultUserInformation} from "./utils/addDefaultData";
import {google} from "googleapis";
import {addSheetToUser, createNewGoogleSheet, SCOPES, ServiceAccount} from "./utils/googleSheetsApi";
import {onCall} from "firebase-functions/v2/https";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

admin.initializeApp();

export const createDefaultUserWorkouts = auth.user().onCreate((user) => {
    const uid = user.uid;
    addDefaultUserInformation(admin.firestore(), user)
    addDefaultWorkout(admin.firestore(), uid);
    logger.info(`Created default workout for user ${user.displayName}`);
})

export const createUserRecordsSheet = onCall(async (request) => {
    const uid = request.data.uid;
    logger.info("Creating new google sheet for user ", uid);
    try {
        // use service account credentials for authentication
        const auth = new google.auth.GoogleAuth({
            credentials: ServiceAccount,
            scopes: SCOPES
        })

        const oAuth2Client = await auth.getClient();

        const sheetUrl = await createNewGoogleSheet(admin.firestore(), oAuth2Client, uid);

        addSheetToUser(admin.firestore(), sheetUrl, request.data.uid);

        return sheetUrl;
    } catch (e) {
        console.error('Error creating google sheet', e);
        return undefined;
    }
})

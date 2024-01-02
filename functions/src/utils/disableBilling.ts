import {ServiceAccount} from "./googleSheetsApi";
import {google} from "googleapis";
import {logger} from "firebase-functions/v2";

const billing = google.cloudbilling('v1').projects;
const PROJECT_ID = ServiceAccount.project_id;
const PROJECT_NAME = `projects/${PROJECT_ID}`;

export default async function disableBilling() {
    // use service account credentials for authentication
    const auth = new google.auth.GoogleAuth({
        credentials: ServiceAccount,
        scopes: [
            'https://www.googleapis.com/auth/cloud-billing',
            'https://www.googleapis.com/auth/cloud-platform'
        ]
    });

    if (PROJECT_NAME) {
        const billingInfo = await billing.getBillingInfo({name: PROJECT_NAME, auth})
        if (billingInfo.data.billingEnabled) {
            try {
                await billing.updateBillingInfo({
                    name: PROJECT_NAME,
                    requestBody: {billingAccountName: ''},
                    auth
                })
                logger.info(`✂️ ${PROJECT_NAME} billing account has been removed`)
            } catch (error) {
                logger.error(error)
            }
        } else {
            console.log('👉 looks like you already disabled billing')
        }
    }
}
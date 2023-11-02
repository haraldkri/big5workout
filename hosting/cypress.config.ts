import * as admin from 'firebase-admin';
import {defineConfig} from 'cypress';
import {plugin as cypressFirebasePlugin} from 'cypress-firebase';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    // NOTE: Add "supportFile" setting if separate location is used
    setupNodeEvents(on, config) {
      // Access the service account details from cypress environment variables
      const projectId = config.env.FIREBASE_PROJECT_ID;
      const privateKey = config.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');  // Ensure newline characters are handled correctly
      const clientEmail = config.env.FIREBASE_CLIENT_EMAIL;

      return cypressFirebasePlugin(on, config, admin, {
        credential: admin.credential.cert({
          projectId,
          privateKey,
          clientEmail
        })
        // Here is where you can pass special options.
        // If you have not set the GCLOUD_PROJECT environment variable, give the projectId here, like so:
        //    projectId: 'some-project',
        // if your databaseURL is not just your projectId plus ".firebaseio.com", then you _must_ give it here, like so:
        //    databaseURL: 'some-project-default-rtdb.europe-west1.firebasedatabase.app',
      });
    },
  },
});
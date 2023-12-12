import {useEffect} from "react";
import {connectAuthEmulator, getAuth} from 'firebase/auth';
import {connectFirestoreEmulator, getFirestore} from 'firebase/firestore';
import {connectFunctionsEmulator, getFunctions} from 'firebase/functions';
// import {connectStorageEmulator, getStorage} from 'firebase/storage';
import {AuthProvider, FirestoreProvider, FunctionsProvider, useFirebaseApp,} from 'reactfire';
import AppRouter from "./AppRouter.tsx";
import {I18nextProvider, useTranslation} from "react-i18next";
import moment from "moment";

function App() {
    const app = useFirebaseApp();
    const firestoreInstance = getFirestore(app);
    const authInstance = getAuth(app);
    const functionsInstance = getFunctions(app, 'us-central1');
    //const storageInstance = getStorage(app);
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        try {
            // Set up emulators
            //connectStorageEmulator(storageInstance, '127.0.0.1', 9199);
            connectAuthEmulator(authInstance, 'http://127.0.0.1:9099', {
                disableWarnings: true,
            });
            connectFirestoreEmulator(firestoreInstance, '127.0.0.1', 8080);
            connectFunctionsEmulator(functionsInstance, '127.0.0.1', 5001);
        } catch (e) {
            console.log(e)
        }
    }

    const {i18n} = useTranslation();

    useEffect(() => {
        const language = localStorage.getItem('i18nLanguage') || 'en';
        moment.locale(language);
        i18n.changeLanguage(language)
    }, [i18n]);

    return (
        <I18nextProvider i18n={i18n}>
            <FirestoreProvider sdk={firestoreInstance}>
                {/*<StorageProvider sdk={storageInstance}>*/}
                <AuthProvider sdk={authInstance}>
                    <FunctionsProvider sdk={functionsInstance}>
                        <AppRouter/>
                    </FunctionsProvider>
                </AuthProvider>
                {/*</StorageProvider>*/}
            </FirestoreProvider>
        </I18nextProvider>
    );
}

export default App;

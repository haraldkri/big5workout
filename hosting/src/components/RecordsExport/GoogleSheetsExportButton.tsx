import {Alert, Button, message} from "antd";
import {useTranslation} from "react-i18next";
import {getFunctions, httpsCallable} from "firebase/functions";
import {FC, useEffect, useState} from "react";
import {FlexSpace, FullWidthButton} from "../StyledComponents";
import {doc, onSnapshot} from "firebase/firestore";
import {useFirestore, useUser} from "reactfire";

const GoogleSheetsExportButton: FC = () => {
    const {t} = useTranslation();
    const firestore = useFirestore();
    const {data: user} = useUser();
    const functions = getFunctions();
    // define region again, because it is not set for some reason
    functions.region = "europe-west3";
    const createRecordsSheet = httpsCallable(functions, 'createUserRecordsSheet');
    const [loadingState, setLoadingState] = useState(false);
    const [userSheetUrl, setUserSheetUrl] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (!user?.uid) return

        const userRef = doc(firestore, `users/${user?.uid}`);
        const unsubscribe = onSnapshot(userRef, (doc) => {
            const data = doc.data();
            setUserSheetUrl(data?.sheet?.url);
        });

        return () => unsubscribe();
    }, [user]);

    const handleOnClick = async () => {
        // Perform export or further processing here
        setLoadingState(true);
        createRecordsSheet()
            .then((result: any) => {
                if (!result) {
                    message.error(t("Error creating google sheet"));
                }
            })
            .finally(() => {
                setLoadingState(false);
            });
    }

    return (
        <FlexSpace direction={"vertical"} align={"center"}>
            <FullWidthButton type={"primary"} size={"large"} disabled={!!userSheetUrl} loading={loadingState}
                             ghost={true}
                             title={t("Export to Google Sheets")}
                             data-cy="data-export-button" onClick={handleOnClick}>
                {t("Export to Google Sheets")}
            </FullWidthButton>
            {
                userSheetUrl && <Alert
                    message={t("Successfully created Google Sheet")}
                    description={
                        <>
                            {t("Use the link below to access the sheet. The created sheet is available for one hour. You can of course simply create a copy to have permanent access to the sheet.")}
                            <Button type="link"
                                    onClick={() => window.open(userSheetUrl, "_blank")}>
                                {t("Google Sheet")}
                            </Button>
                        </>
                    }
                    type="success"
                    showIcon
                />
            }
        </FlexSpace>
    );
}

export default GoogleSheetsExportButton;
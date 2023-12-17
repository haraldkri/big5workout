import {Button, message} from "antd";
import {useTranslation} from "react-i18next";
import {getFunctions, httpsCallable} from "firebase/functions";
import {FC, useState} from "react";
import {useOutletContext} from "react-router-dom";

interface Props {
    disabled?: boolean,
    loading?: boolean
}

const RecordsExportButton: FC<Props> = ({disabled, loading}) => {
    const [loadingState, setLoadingState] = useState(false);
    const {t} = useTranslation();
    const uid: string = useOutletContext();
    const functions = getFunctions();
    // define region again, because it is not set for some reason
    functions.region = "europe-west3";
    const createRecordsSheet = httpsCallable(functions, 'createUserRecordsSheet');

    const handleOnClick = async () => {
        // Perform export or further processing here
        setLoadingState(true);
        createRecordsSheet(uid)
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
        <Button type={"primary"} size={"large"} disabled={disabled} loading={loadingState || loading} ghost={true}
                title={t("Export to Google Sheets")}
                data-cy="data-export-button" onClick={handleOnClick}>
            {t("Export to Google Sheets")}
        </Button>
    );
}

export default RecordsExportButton;
import {Button, message} from "antd";
import {useTranslation} from "react-i18next";
import {getFunctions, httpsCallable} from "firebase/functions";
import {FC} from "react";
import {useOutletContext} from "react-router-dom";

interface Props {
    disabled?: boolean,
    loading?: boolean
}

const RecordsExportButton: FC<Props> = ({disabled, loading}) => {
    const {t} = useTranslation();
    const uid: string = useOutletContext();
    const functions = getFunctions();
    // define region again, because it is not set for some reason
    functions.region = "europe-west3";
    const createRecordsSheet = httpsCallable(functions, 'createUserRecordsSheet');

    const handleOnClick = async () => {
        // Perform export or further processing here
        createRecordsSheet(uid).then((result: any) => {
            if (!result) {
                message.error("Error creating google sheet");
            }
        })
    }

    return (
        <Button type={"primary"} size={"large"} disabled={disabled} loading={loading} ghost={true} title={t("Export to Google Sheets")}
                data-cy="data-export-button" onClick={handleOnClick}>
            {t("Export to Google Sheets")}
        </Button>
    );
}

export default RecordsExportButton;
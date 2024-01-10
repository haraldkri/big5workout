import {message} from "antd";
import {useTranslation} from "react-i18next";
import {getFunctions, httpsCallable} from "firebase/functions";
import {FC, useState} from "react";
import {FullWidthButton} from "../StyledComponents";

const CsvExportButton: FC = () => {
    const {t} = useTranslation();
    const functions = getFunctions();
    functions.region = "europe-west3";
    const createRecordsCsvFile = httpsCallable(functions, 'createUserRecordsCsvFile');
    const [loadingState, setLoadingState] = useState(false);

    const handleOnClick = async () => {
        setLoadingState(true);
        createRecordsCsvFile()
            .then((result: any) => {
                if (!result || !result.data) {
                    message.error(t("Error creating csv file"));
                } else {
                    // Create a blob from the CSV data
                    const blob = new Blob([result.data.data], {type: 'text/csv;charset=utf-8;'});

                    // Create a link element
                    const link = document.createElement('a');

                    // Set the href and download attributes of the link
                    link.href = URL.createObjectURL(blob);
                    link.download = result.data.filename;

                    // Append the link to the body
                    document.body.appendChild(link);

                    // Simulate a click on the link
                    link.click();

                    // Remove the link from the body
                    document.body.removeChild(link);
                }
            })
            .catch((error: any) => {
                console.error(error);
                message.error(t("Error creating csv file"));
            })
            .finally(() => {
                setLoadingState(false);
            });
    }

    return (
        <FullWidthButton type={"primary"} size={"large"} loading={loadingState} ghost={true} onClick={handleOnClick}>
            {t("Export to CSV")}
        </FullWidthButton>
    );
}

export default CsvExportButton;
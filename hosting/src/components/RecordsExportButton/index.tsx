import {Button} from "antd";
import {useTranslation} from "react-i18next";
//import {google} from "googleapis";
import {collection, getDocs, getFirestore, orderBy, query} from "firebase/firestore";
import {useUser} from "reactfire";

type RecordData = { [exerciseId: string]: object[] }

const RecordsExportButton = () => {
    const {t} = useTranslation();
    const firestore = getFirestore();
    const user = useUser();
    const uid = user?.data?.uid;

    const getRecords = async () => {
        let recordsData: RecordData = {};
        const exerciseSnapshot = await getDocs(collection(firestore, `users/${uid}/exercises`));

        for (const doc of exerciseSnapshot.docs) {
            const exerciseId = doc.id;
            const recordSnapshot = await getDocs(query(
                    collection(firestore, `users/${uid}/exercises/${exerciseId}/records`),
                    orderBy("timestamp", 'asc')
                ));

            recordsData[exerciseId] = [];

            for (const record of recordSnapshot.docs) {
                const {timestamp, weight, duration} = record.data();
                if (Number.isFinite(timestamp) && Number.isFinite(weight) && Number.isFinite(duration)) {
                    recordsData[exerciseId].push(record.data());
                }
            }
        }

        return recordsData;
    };

    const handleOnClick = async () => {
        console.log(uid);
        try {
            let recordsData: RecordData = await getRecords();
            console.log(recordsData);
            // Perform export or further processing here
        } catch (error) {
            console.error("Error fetching records:", error);
        }
    }

    return (
        <Button type={"primary"} size={"large"} ghost={true} title={t("Export to Google Sheets")}
                data-cy="data-export-button" onClick={handleOnClick}>
            {t("Export to Google Sheets")}
        </Button>
    );
}

export default RecordsExportButton;
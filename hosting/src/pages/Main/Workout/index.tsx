import {Button, message} from "antd";
import {useTranslation} from "react-i18next";
import {AppPageWrapper, CenterInline} from "../../../components/StyledComponents";
import {useNavigate} from "react-router-dom";
import {collection, limit, orderBy, query} from "firebase/firestore";
import {useFirestore, useFirestoreCollectionData, useUser} from "reactfire";
import {getName} from "../../../utils/languageKeySelect.ts";
import LoadingSpinner from "../../../components/LoadingSpinner";
import _ from "lodash";

const WorkoutSelectList = () => {
    const navigate = useNavigate();
    const {i18n, t} = useTranslation();
    const firestore = useFirestore();
    const {data: user} = useUser();

    const {data: workoutList, status, isComplete} = useFirestoreCollectionData(
        query(
            collection(firestore, `users/${user?.uid}/workouts`),
            orderBy("lastUsed", 'desc'),
            limit(20)
        )
    );

    if (status === 'loading') return <LoadingSpinner/>;
    if (isComplete && _.isEmpty(workoutList)) message.error(t("No workouts found"));

    const onWorkoutSelect = (workoutKey: string) => {
        navigate(`/app/workout/${workoutKey}`);
    }

    return (
        <AppPageWrapper data-cy={'workout-select-page'}>
            <CenterInline>
                {
                    workoutList.map((workout: any) => {
                        const name = getName(workout, i18n.language);
                        const key = workout.key;
                        return (
                            <Button key={key} data-cy={`workout-${key}`} type={"primary"}
                                    size={"large"} ghost={true} title={name}
                                    onClick={() => onWorkoutSelect(key)}>
                                {name}
                            </Button>
                        )
                    })
                }
            </CenterInline>
        </AppPageWrapper>
    );
};

export default WorkoutSelectList
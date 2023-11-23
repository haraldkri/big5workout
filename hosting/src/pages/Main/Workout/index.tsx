import {Button} from "antd";
import {useTranslation} from "react-i18next";
import {AppPageWrapper, CenterInline} from "../../../components/StyledComponents";
import {useNavigate} from "react-router-dom";
import {collection, getDocs, limit, orderBy, query} from "firebase/firestore";
import {useFirestore, useUser} from "reactfire";
import {getName} from "../../../utils/languageKeySelect.ts";
import {useEffect, useState} from "react";
import {WorkoutWithId} from "../../../types.ts";

const WorkoutSelectList = () => {
    const navigate = useNavigate();
    const {i18n} = useTranslation();
    const firestore = useFirestore();
    const user = useUser();
    const uid = user?.data?.uid;
    const [workoutList, setWorkoutList] = useState<WorkoutWithId[]>([]);

    useEffect(() => {
        getDocs(query(
            collection(firestore, `users/${uid}/workouts`),
            orderBy("lastUsed", 'desc'),
            limit(20)
        )).then((docSnap) => {
            setWorkoutList(docSnap.docs.map((doc: any) => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            }));
        });
    }, [uid, firestore]);

    const onWorkoutSelect = (workoutId: string) => {
        navigate(`/app/workout/${workoutId}`);
    }

    return (
        <AppPageWrapper data-cy={'workout-select-page'}>
            <CenterInline>
                {
                    workoutList.map((workout: any) => {
                        const name = getName(workout, i18n.language);
                        const id = workout.id;
                        return (
                            <Button key={id} data-cy={`workout-${id}`} type={"primary"}
                                    size={"large"} ghost={true} title={name}
                                    onClick={() => onWorkoutSelect(id)}>
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
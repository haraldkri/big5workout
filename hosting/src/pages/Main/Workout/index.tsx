import {Button} from "antd";
import {useTranslation} from "react-i18next";
import {AppPageWrapper, CenterInline} from "../../../components/StyledComponents";
import {useNavigate} from "react-router-dom";
import {collection, getDocs, limit, orderBy, query} from "firebase/firestore";
import {useFirestore, useUser} from "reactfire";
import {getName} from "../../../utils/languageKeySelect.ts";
import {useEffect, useState} from "react";
import {Workout} from "../../../types.ts";

const WorkoutSelectList = () => {
    const navigate = useNavigate();
    const {i18n} = useTranslation();
    const firestore = useFirestore();
    const user = useUser();
    const uid = user?.data?.uid;
    const [workoutList, setWorkoutList] = useState<Workout[]>([]);

    useEffect(() => {
        if (!uid) return;
        getDocs(query(
            collection(firestore, `users/${uid}/workouts`),
            orderBy("lastUsed", 'desc'),
            limit(20)
        )).then((docSnap) => {
            if (docSnap.empty) return console.log('no workouts found');
            setWorkoutList(docSnap.docs.map((doc: any) => doc.data()));
        });
    }, [uid, firestore]);

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
import {Button} from "antd";
import {useTranslation} from "react-i18next";
import {AppPageWrapper, CenterInline} from "../../../components/StyledComponents";
import {useNavigate} from "react-router-dom";
import {collection, limit, onSnapshot, orderBy, query} from "firebase/firestore";
import {useFirestore} from "reactfire";
import {getName} from "../../../utils/languageKeySelect.ts";
import LoadingSpinner from "../../../components/LoadingSpinner";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../../context/UserContext.ts";

const WorkoutSelectList = () => {
    const [workoutList, setWorkoutList] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const {i18n} = useTranslation();
    const firestore = useFirestore();
    const {user} = useContext(UserContext)

    useEffect(() => {
        if (!user?.uid) return

        setLoading(true)
        const collectionRef = collection(firestore, `users/${user?.uid}/workouts`);
        const q = query(collectionRef, orderBy("lastUsed", 'desc'), limit(20));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            setWorkoutList(querySnapshot.docs.map((doc) => doc.data()));
            setLoading(false)
        });

        return () => unsubscribe();
    }, [user, firestore]);

    if (loading) return <LoadingSpinner/>;

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
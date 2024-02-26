import {useTranslation} from "react-i18next";
import {AppPageWrapper, FullWidthButton} from "../../../components/StyledComponents";
import {useNavigate} from "react-router-dom";
import {collection, limit, onSnapshot, orderBy, query} from "firebase/firestore";
import {useFirestore} from "reactfire";
import {getName} from "../../../utils/languageKeySelect.ts";
import LoadingSpinner from "../../../components/LoadingSpinner";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../../context/UserContext.ts";
import styled from "styled-components";

const CenterInline = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 16px;
  overflow: scroll;
`;

const WorkoutSelectList = () => {
    const [workoutList, setWorkoutList] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const {t, i18n} = useTranslation();
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

    const onWorkoutSelect = (workoutKey: string) => {
        navigate(`/app/workout/active/${workoutKey}`);
    }

    return (
        <AppPageWrapper data-cy={'workout-select-page'}>
            <CenterInline>
                {
                    loading
                        ? <LoadingSpinner/>
                        : workoutList.map((workout: any) => {
                            const name = getName(workout, i18n.language);
                            const id = workout.id;
                            return (
                                <FullWidthButton key={id} data-cy={`workout-${id}`} type={"primary"}
                                                 size={"large"} ghost={true} title={name}
                                                 onClick={() => onWorkoutSelect(id)}>
                                    {name}
                                </FullWidthButton>
                            )
                        })
                }
            </CenterInline>
            <FullWidthButton key={"add-workout"} type={"link"}
                             size={"large"}
                             onClick={() => navigate(`/app/workout/add-workout`)}>
                {t('Add Workout')}
            </FullWidthButton>
        </AppPageWrapper>
    );
};

export default WorkoutSelectList
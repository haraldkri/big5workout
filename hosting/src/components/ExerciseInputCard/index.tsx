import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {Exercise} from "../../static/defaultExercises.ts";
import {useFirestore} from "reactfire";
import {collection, doc, getDoc, getDocs, limit, orderBy, query} from "firebase/firestore";
import {useOutletContext} from "react-router-dom";
import Card from "./Card";

type Props = {
    exerciseId?: string,
    value?: {
        weight: number,
        duration: number
    },
    onChange?: (value: { weight?: number, duration?: number }) => void,
    useMinView?: boolean,
}

function getExerciseName(exercise: Exercise | null, language: string) {
    if (!exercise) return undefined;
    if (language === "de") return exercise.germanName;
    return exercise.englishName;
}

const ExerciseInputCard = (props: Props) => {
    const {exerciseId, value, onChange, useMinView} = props;
    const {i18n} = useTranslation();
    const uid: string = useOutletContext();
    const firestore = useFirestore();

    const [exercise, setExercise] = useState<Exercise | null>(null);
    const [latestWeight, setLatestWeight] = useState<number | undefined>(undefined);
    const [latestDuration, setLatestDuration] = useState<number | undefined>(undefined);

    useEffect(() => {
        if (exerciseId) {
            // get general data of the exercise
            getDoc(doc(collection(firestore, 'exercise'), exerciseId)).then(
                (docSnap: any) => {
                    if (docSnap.exists()) {
                        setExercise(docSnap.data());
                    }
                }
            );

            // get the latest weight and duration of the exercise
            const userRef = doc(collection(firestore, 'users'), uid);
            const exerciseRef = doc(collection(userRef, 'exercises'), exerciseId);
            const recordsRef = collection(exerciseRef, 'records');
            const q = query(recordsRef, orderBy("timestamp"), limit(1));
            getDocs(q).then((querySnap) => {
                if (!querySnap.empty) {
                    querySnap.forEach((doc) => {
                        const data = doc.data();
                        setLatestWeight(data.weight);
                        setLatestDuration(data.duration);
                    });
                }
            });
        }
    }, [exerciseId]);

    const title = getExerciseName(exercise, i18n.language) ?? '';

    return <Card
        value={value}
        onChange={onChange}
        title={title}
        images={exercise?.images}
        latestDuration={latestDuration}
        latestWeight={latestWeight}
        useMinView={useMinView}
    />
}

export default ExerciseInputCard;

/*
* Thanks to Victor Eke, the author of the article on how to use lazy loading images in React.
* https://www.freecodecamp.org/news/how-to-lazy-load-images-in-react/
*/
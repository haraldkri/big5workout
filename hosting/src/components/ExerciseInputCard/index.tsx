import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {Exercise} from "../../static/defaultExercises.ts";
import {useFirestore, useUser} from "reactfire";
import {collection, getDocs, limit, orderBy, query, where} from "firebase/firestore";
import Card from "./Card";
import {getName} from "../../utils/languageKeySelect.ts";

type Props = {
    exerciseId?: string,
    onChange?: (value: { weight?: number, duration?: number }) => void,
    useMinView?: boolean,
}

const ExerciseInputCard = (props: Props) => {
    const {exerciseId, onChange, useMinView} = props;
    const {i18n} = useTranslation();
    const user = useUser();
    const uid = user?.data?.uid;
    const firestore = useFirestore();

    const [exercise, setExercise] = useState<Exercise | null>(null);
    const [latestWeight, setLatestWeight] = useState<number | undefined>(undefined);
    const [latestDuration, setLatestDuration] = useState<number | undefined>(undefined);

    useEffect(() => {
        if (exerciseId) {
            // get general data of the exercise
            getDocs(query(
                collection(firestore, 'exercises'),
                where('id', '==', exerciseId)
            ))
                .then((querySnap) => {
                    querySnap.forEach((doc: any) => {
                        if (doc.exists()) {
                            setExercise(doc.data());
                        }
                    });
                });


            // get the latest weight and duration of the exercise
            getDocs(query(
                collection(firestore, `users/${uid}/exercises/${exerciseId}/records`),
                orderBy("timestamp", 'desc'),
                limit(1)
            )).then((querySnap) => {
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

    const title = getName(exercise, i18n.language) ?? '';

    return <Card
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
import {addDoc, collection} from "firebase/firestore";
import defaultExercises from "../static/defaultExercises.ts";
import {Firestore} from "@firebase/firestore";

export const addDefaultWorkout = (firestore: Firestore, uid: string) => {
    const defaultWorkoutExerciseIds = defaultExercises.map((exercise) => exercise.id);
    addDoc(
        collection(firestore, `users/${uid}/workouts`),
        {
            germanName: "Default Training",
            englishName: "Default Workout",
            exerciseIds: defaultWorkoutExerciseIds,
            createdAt: new Date().getTime(),
            lastUsed: new Date().getTime(),
        }
    )
        .then((res) => console.log("added exercise", res))
        .catch((err) => console.log("error adding exercise", err));
}

export const addDefaultExercises = (firestore: Firestore) => {
    const exerciseCollection = collection(firestore, 'exercises');

    defaultExercises.forEach((exercise) => {
        addDoc(exerciseCollection, exercise)
            .then((res) => console.log("added exercise", res))
            .catch((err) => console.log("error adding exercise", err));
    });
}

export const getDefaultExerciseIds = () => {
    return defaultExercises.map((exercise: any) => exercise.id);
}

export const addExampleExerciseRecords = (firestore: Firestore, uid: string) => {
    const promises = [];
    defaultExercises.forEach((exercise: any) => {
        const recordCollection = collection(firestore, `users/${uid}/exercises/${exercise.id}/records`);
        promises.push(addDoc(recordCollection, {
            timestamp: new Date().getTime(),
            weight: generateRandomNumber(0, 100, 2.5),
            duration: generateRandomNumber(40, 180, 1),
        }));
    });
}

function generateRandomNumber(min: number, max: number, stepSize: number) {
    return Math.floor(Math.random() * (max - min) / stepSize) * stepSize + min;
}


// const exerciseImageFolder = '../assets/exerciseImages/';
//
// const downloadExerciseImage = (url: string) => {
//     if (!url) {
//         return;
//     }
//
//     const name = url.split('/').pop();
//     saveAs(url, `${exerciseImageFolder}${name}`);
//
//     return name
// }
//
// const uploadExerciseImage = (imageName: string, exerciseId:string) => {
//     if (!imageName || !exerciseId) {
//         return;
//     }
//
//     const storage = useStorage();
//
//     try {
//
//         const filePath = `${exerciseImageFolder}${imageName}`;
//         const storeFilePath = `images/${exerciseId}/${imageName}`;
//         const newImageRef = ref(storage, filePath);
//         await uploadBytesResumable(newImageRef, image);
//         const publicImageUrl = await getDownloadURL(newImageRef);
//         const restaurantRef = doc(collection(firestore, 'restaurants'), id);
//         console.log(publicImageUrl, '2');
//         restaurantRef
//             ? await updateDoc(restaurantRef, {
//                 photo: publicImageUrl,
//             })
//             : null;
//     } catch (error) {
//         console.error(
//             'There was an error uploading a file to Cloud Storage:',
//             error
//         );
//     }
// }
//

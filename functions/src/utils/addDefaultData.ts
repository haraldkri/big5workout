import {auth, firestore} from "firebase-admin";
import UserRecord = auth.UserRecord;
import Firestore = firestore.Firestore;

export function addDefaultUserInformation(firestore: Firestore, user: UserRecord) {
    firestore.collection("users").doc(user.uid).set({
        email: user.email,
        createdAt: new Date().getTime(),
    })
        .then((res) => console.log("Added new user", res))
        .catch((err) => console.log("error adding user", err));
}

export default function addDefaultWorkout(firestore: Firestore, uid: string) {
    defaultWorkouts.forEach((workout) => {
        firestore.collection(`users/${uid}/workouts`).add({
            ...workout,
            createdAt: new Date().getTime(),
            lastUsed: new Date().getTime(),
        })
            .then((res) => console.log("Added default workouts", res))
            .catch((err) => console.log("Error adding default workouts", err));
    });
}

const defaultWorkouts = [
    {
        id: "big-5",
        name: {
            de: "Großen 5",
            en: "Big 5",
        },
        exerciseIds: [
            "machine-chest-press",
            "machine-shoulder-press",
            "machine-seated-row",
            "machine-pull-down",
            "machine-leg-press",
        ],
    },
    {
        id: "big-3-1",
        name: {
            de: "Großen 3 - 1",
            en: "Big 3 - 1",
        },
        exerciseIds: [
            "machine-pull-down",
            "machine-chest-press",
            "machine-leg-press"
        ],
    },
    {
        id: "big-3-2",
        name: {
            de: "Großen 3 - 2",
            en: "Big 3 - 2",
        },
        exerciseIds: [
            "machine-seated-row",
            "overhead-press",
            "standing-calf-raise"
        ],
    },
    {
        id: "split-routine-1",
        name: {
            de: "Split Routine - 1",
            en: "Split Routine - 1",
        },
        exerciseIds: [
            "machine-chest-press",
            "machine-lateral-raise",
            "machine-triceps-press"
        ],
    },
    {
        id: "split-routine-2",
        name: {
            de: "Split Routine - 2",
            en: "Split Routine - 2",
        },
        exerciseIds: [
            "machine-crunches",
            "standing-calf-raise",
            "machine-leg-press"
        ],
    },
    {
        id: "split-routine-3",
        name: {
            de: "Split Routine - 3",
            en: "Split Routine - 3",
        },
        exerciseIds: [
            "machine-biceps-curl",
            "machine-lower-back",
            "machine-pull-down",
            "machine-seated-row",
            "machine-shrugs"
        ],
    },

];
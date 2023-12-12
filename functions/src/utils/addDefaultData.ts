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
  firestore.collection(`users/${uid}/workouts`).add({
    key: "default-training",
    germanName: "Default Training",
    englishName: "Default Workout",
    exerciseIds: [
      "machine-chest-press",
      "machine-shoulder-press",
      "machine-seated-row",
      "machine-pull-down",
      "machine-leg-press",
    ],
    createdAt: new Date().getTime(),
    lastUsed: new Date().getTime(),
  })
    .then((res) => console.log("Added default workouts", res))
    .catch((err) => console.log("Error adding default workouts", err));
}

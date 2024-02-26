
# Reminders

## Firebase Functions

- All functions require the components to be inside the respective Providers
  , see: `./src/App.tsx`

### Add a new document to a collection in firestore

- check that you have the correct permissions in the firestore rules
  -> when using the emulators, check you local `firebase.json` to check where the rules are defined

```
  "firestore": {
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  },
```

- in this case we can check the rules in `firestore.rules`
- you need create permissions for the collection
- to get started, we can use the following rules (these are insecure and should only be used for developing):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
  // the documentId is auto-generated when using addDoc
    match /yourCollectionName/{documentId} {
      allow read;
      allow create: if true
      allow update: if true
    }
  }
}

```

```typescript jsx
import {FC} from "react";
import {useFirestore} from "reactfire";
import {addDoc, collection} from "firebase/firestore";

const YourFunctionalComponent: FC = () => {
    const firestore = useFirestore();

    const addNewDocument = () => {
        const yourCollection = collection(firestore, 'yourCollectionName');

        const newDocument = {
            name: 'yourName',
            key2: "value2",
            complexData: {
                key1: "value1",
                key2: "value2"
            },
            array: ["value1", "value2"]
        };
        addDoc(yourCollection, newDocument)
            .then((res) => console.log("added document", res))
            .catch((err) => console.log("error adding document", err));
    }

    return (
        <div>
            <h1>Functional Component</h1>
            <button onClick={addNewDocument}>Add new document</button>
        </div>
    );
};
```

### Get all documents from a collection in firestore

- you need read permissions for the collection in the `firestore.rules` file

```
  match /databases/{database}/documents {
    // Exercises:
    //   - Authenticated user can read
    match /exercises/{exerciseId} {
      allow read: if request.auth != null;
    }
  }
```

- here is a complex example showing how to query a collection in firestore with further filtering

```typescript jsx
import {FC} from "react";
import {useFirestore, useFirestoreCollectionData} from "reactfire";
import {collection} from "firebase/firestore";

const YourFunctionalComponent: FC = () => {
    const firestore = useFirestore();
    const uid: string = useOutletContext(); // this would require the component to be inside the UserProvider `./src/providers/UserProvider`
    const exerciseId = 'yourExerciseId';

    const {data: exerciseData, status, error} = useFirestoreCollectionData(
        query(
            collection(firestore, `users/${uid}/exercises/${exerciseId}/records`),
            orderBy("timestamp", 'desc'), //'asc' or 'desc'
            limit(1) // limit the number of documents returned
        ),
        {
            initialData: []
        }
    );

    if (status === 'loading') {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <div>
            <h1>Functional Component</h1>
            <ul>
                {data.map((doc) => <li key={doc.id}>{doc.name}</li>)}
            </ul>
        </div>
    );
};
```

#### Querying a collection on user action

 ```typescript jsx
 import {FC, useState} from "react";
import {useFirestore, useFirestoreCollectionData} from "reactfire";
import {collection, getDoc} from "firebase/firestore";

type ExerciseRecord = {
    id: string;
    name: string;
    timestamp: number;
}

const YourFunctionalComponent: FC = () => {
    const [data, setData] = useState<ExerciseRecord[]>([]);
    const firestore = useFirestore();
    const uid = 'yourUserId';
    const exerciseId = 'yourExerciseId';

    const onClickHandler = () => {
        getDoc(
            query(
                collection(firestore, `users/${uid}/exercises/${exerciseId}/records`),
                orderBy("timestamp", 'desc'), //'asc' or 'desc'
                limit(5) // limit the number of documents returned
            ))
            .then(
                (docSnap: any) => {
                    if (docSnap.exists()) {
                        setData(docSnap.data());
                    } else {
                        console.log("No such document found!");
                    }

                }
            )
            .catch((err) => console.log("error getting document", err));
    };

    return (
        <div>
            <h1>Functional Component</h1>
            <button onClick={onClickHandler}>Click me to query data</button>
            <ul>
                {data.map((doc) => <li key={doc.id}>{doc.name}</li>)}
            </ul>
        </div>
    );
};
 ```

``In case you need to update to sets of documents at the same time and it would lead to problems if only one got through, use a transaction instead``

- [Transaction Example](https://firebase.google.com/codelabs/firestore-web#10)

### Update a document in firestore

- you need update permissions for the collection in the `firestore.rules` file

```
  match /databases/{database}/documents {
    // Exercises:
    //   - Authenticated user can read
    //   - Authenticated user can update
    match /exercises/{exerciseId} {
      allow read: if request.auth != null;
      allow update: if request.auth != null;
    }
  }
```

- here is a complex example showing how to update a document in firestore

```typescript jsx
import {FC} from "react";
import {useFirestore} from "reactfire";
import {doc, updateDoc} from "firebase/firestore";

const YourFunctionalComponent: FC = () => {
  const firestore = useFirestore();
  const uid = 'yourUserId';
  const exerciseId = 'yourExerciseId';

  const updateDocument = () => {
    const newWeight = 100;
    const exerciseRef = doc(firestore, `users/${uid}/exercises/${exerciseId}`);
    updateDoc(exerciseRef, {
      weight: newWeight,
    })
        .then((res) => console.log("updated document successfully", res))
        .catch((err) => console.log("error updating document", err));
  }

  return (
          <div>
            <h1>Functional Component</h1>
            <button onClick={updateDocument}>Update document</button>
          </div>
  );
};
```
# TODO

- add back button to all pages (especially the legal pages)
- add custom workouts
- add custom exercises
- add workout list
- add exercise list
- save exercise images in store
- do not query the images if useMinView is true
- create ui endpoint for uploading images for exercises for service user

# Important

- make sure that users can only request their own data

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
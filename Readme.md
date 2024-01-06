# Custom workout app
Checkout [big5workout app](https://big5workout.web.app/)

- inspired after reading the book "Body by Science" by Doug McGuff and John Little
- fun project to learn new technologies
- main features:
    - simple and fast workout tracking
    - directly see the weight you used the last time for each exercise in the workout

## Design

- [Figma](https://www.figma.com/file/ki0V74jthpcWZpdfiSg8PZ/big5workout?type=design&node-id=1%3A3&mode=design&t=8Ap95bPSUntseAOt-1)

## Primary Technologies in use

- [React](https://reactjs.org/) (for the frontend)
- [ant.design](https://ant.design/) (for common UI components)
- [Typescript](https://www.typescriptlang.org/) (for type safety)
- [i18next](https://www.i18next.com/) (for translations)
- [Firebase](https://firebase.google.com/) (for hosting, authentication, database, storage, functions)
- [Nodemailer](https://nodemailer.com/about/) (for sending emails)
- [Googleapis](https://developers.google.com/apis-explorer) (for Google API access, e.g. Google Drive, Google Sheets,
  Google Cloud Tasks, ...)
- [Cypress](https://www.cypress.io/) (for end-to-end testing)
- [Jest](https://jestjs.io/) (for unit testing)
- ... and many more awesome open source libs (see package.json)

## Consoles for managing the project

- [Firebase Console](https://console.firebase.google.com/u/2/project/big5workout/overview)
- [Google Cloud Console](https://console.cloud.google.com/home/dashboard?project=big5workout)

## Handling Project related emails

- [Google Group](https://groups.google.com/u/2/g/big5workout) (for receiving emails from the contact form)
- [Gmail](https://mail.google.com/) (separate account for sending the contact emails to the google group)

## Handling monthly budget

- Budget is handled via Google API (cloudbilling, pubsub) \
  --> configured to automatically shut down the project if the budget is exceeded

## other

- [simpleimageresizer](https://www.simpleimageresizer.com/upload) (Online Tool for resizing pictures down to create
  preview images for the exercises)
- AIs used during development:
    - [Phind](https://www.phind.com/)
    - [Chatgpt](https://chatgpt.com/)
    - [Github Copilot](https://copilot.github.com/)

## Base project
- [friendlyeats-web](https://github.com/firebase/friendlyeats-web/tree/master/reactfire-end)

## Author
Harald Kriebisch

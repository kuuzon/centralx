# CentralX
 A fullstack, mock cryptocurrency / CBDC website aimed at demonstrating React.js, Node.js, Cloud Firestore fundamentals by [AGMB](https://github.com/kuuzon)

# React.js Client
## Install

All base required packages are pre-installed - see `package.json` for more details:

    # With Yarn
    cd client
    yarn install

    # With NPM
    cd client
    npm i 

## Setup of Environmental Variables

To ensure the client runs correctly, you will need to set the following variables in a client-side `.env` file:

    # env file
    REACT_APP_CXAPI_URL=
    *the url of the server-side API*

    REACT_APP_STORAGE_BUCKET_URL=
    *url of the Google Cloud Storage Bucket, provided in Firebase Project settings OR base URL in Cloud Storage*

## Usage

The project using React.js client, with `react-scripts`.  In the project directory, you can run:

    # With Yarn
    yarn start
    yarn build

    # With NPM
    npm start
    npm build

**For detailed React.js instructions, see [React Client README](./client/README.md)**

&nbsp;

# Node.js Server

## Install

All base required packages are pre-installed - see `package.json` for more details:

    # With Yarn
    cd server
    yarn install

    # With NPM
    cd server
    npm i 

## Setup of Environmental Variables

To ensure the server runs, you will need to set the following variables in a client-side `.env` file:

    # env file
    PORT=
    *the exposed port of the server-side API*

    GOOGLE_APPLICATION_CREDENTIALS=
    *the absolute local filepath of the .json credentials key provided by Google Cloud Firestore Admin SDK*

    STORAGE_BUCKET_URL=
    *url of the Google Cloud Storage Bucket, provided in Firebase Project settings OR base URL in Cloud Storage*

    JWT_SECRET=
    *custom secret key for minting JWT tokens*

    # optional cors url envs
    CORS_WHITELIST_1=
    CORS_WHITELIST_2=
    *whitelists client-side urls allowed to connect to the API - ideally being a testing domain & actual, if hosted*

## Usage

The project is run as a Node.js server, with scripts allowing for the use of `nodemon` to spin up the development environment:

    # With Yarn
    yarn debug
    yarn server

    # With NPM
    npm run debug
    npm run server

    *debug: debugging development mode, will all CLI logs exposed*
    *server: refined production environment, where only essential logs exposed to CLI*

**For server-side spin up options, see `scripts` in [Node Server `package.json`](./server/package.json)**

## Google Cloud Firestore & Cloud Storage

The project database is hosted using Google Cloud Firestore using the [Firebase Admin SDK](https://firebase.google.com/docs/reference/admin/node).

The project will need to Firebase Admin SDK Service Account via the [Firebase Console](https://console.firebase.google.com/u/0/).  You will need to configure your account settings to allow for credentials access to both the Cloud Firestore & Cloud Storage services, which are passed into the `envs` above.
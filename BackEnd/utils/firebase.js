// const admin = require('firebase-admin');
// const multer = require('multer');

// // Initialize Firebase app
// const serviceAccount = require('../node_modules/songvault-7f750-firebase-adminsdk-6x758-8dfbc34995.json');
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   storageBucket: 'gs://songvault-7f750.appspot.com'
// }, 'songVaultApp');
// const bucket = admin.storage().bucket('songVaultApp.appspot.com');

// // Configure multer
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// module.exports = { bucket, upload };

const admin = require('firebase-admin');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const serviceAccount = require('../node_modules/songvault-7f750-firebase-adminsdk-6x758-8dfbc34995.json');

let bucket;
// let upload;

function initializeFirebase() {
  if (!admin.apps.length) {
    // const serviceAccount = require('../node_modules/songvault-7f750-firebase-adminsdk-6x758-8dfbc34995.json');
    // admin.initializeApp({
    //   credential: admin.credential.cert(serviceAccount),
    //   storageBucket: 'gs://songvault-7f750.appspot.com'
    // }, 'songVaultApp');
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: 'gs://songvault-7f750.appspot.com'
        });
  }

//   bucket = admin.storage().bucket('songVaultApp.appspot.com');
  bucket = admin.storage().bucket();
//   upload = multer({ storage: multer.memoryStorage() });
//   const storage = multer.memoryStorage();
//   upload = multer({storage: storage});
}

module.exports = { bucket, initializeFirebase };


// use the bucket object to upload and download files from Firebase Storage
// use the upload object to handle file uploads using multer

// const multer = require("multer");
// const fs = require('fs');
// const path = require('path');
// const admin = require('firebase-admin');
// const serviceAccount = require('../node_modules/songvault-7f750-firebase-adminsdk-6x758-8dfbc34995.json');

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     storageBucket: 'gs://songvault-7f750.appspot.com'
//   });
  
//   const bucket = admin.storage().bucket();
  
//   // Create a Multer storage object with options
//   const storage = multer.memoryStorage();
//   const upload = multer({ storage: storage });
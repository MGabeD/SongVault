const express = require("express");
const multer = require("multer");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const todoRoutes = require("./routes/todos.js");
const userRoutes = require("./routes/users.js");
const requestRoutes = require("./routes/requests.js");
const authRoutes = require("./routes/auth.js");
// const songRoutes = require("./routes/songs.js");
const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');
const serviceAccount = require('songvault-7f750-firebase-adminsdk-6x758-8dfbc34995.json');

const PORT = 3001;


////////////////////////////////////////////////////////////
// Firebase stuff //

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://songvault-7f750.appspot.com'
});

const bucket = admin.storage().bucket();

// Create a Multer storage object with options
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


app.post("/uploadSong", upload.fields([
    {name: 'Audio', maxCount: 1},
    {name: 'Image', maxCount: 1},
]), async (req, res) => {
    try {
        // Get the files from the request
        const audioFile = req.files['Audio'][0];
        const imageFile = req.files['Image'][0];
        const songName = req.body.songName;
        console.log('SongName: ' + songName)

        // Create a file object to upload the audio file to Firebase Storage
        const audioFileObject = bucket.file(`${songName}/${audioFile.originalname}`);

        // Create a write stream to Firebase Storage for the audio file
        const audioStream = audioFileObject.createWriteStream({
            metadata: {
                contentType: audioFile.mimetype
            }
        });
    
        // Handle errors during the audio file upload
        audioStream.on("error", err => {
        console.error(err);
            res.status(500).send("Failed to upload audio file");
        });
    
        // Handle the end of the audio file upload
        audioStream.on("finish", async () => {
            // Create a file object to upload the image file to Firebase Storage
            const imageFileObject = bucket.file(`${songName}/${imageFile.originalname}`);
    
            // Create a write stream to Firebase Storage for the image file
            const imageStream = imageFileObject.createWriteStream({
                metadata: {
                    contentType: imageFile.mimetype
                }
            });
    
            // Handle errors during the image file upload
            imageStream.on('error', err => {
                console.error(err);
                res.status(500).send("Failed to upload image file");
            });
        
                // Pipe the image file stream to the Firebase Storage write stream
            imageStream.end(imageFile.buffer);
        });
    
        // Pipe the audio file stream to the Firebase Storage write stream
        audioStream.end(audioFile.buffer);
        res.status(200).send("Good Shit");
    
    } catch (err)  {
        console.log(err)
        res.status(500).send("Error uploading the files");
    }
});





// end Firebase stuff //
main()
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect("mongodb://129.114.27.13:27017/test")
    // await mongoose.connect("mongodb://localhost:27017/test");
} 

app.use(bodyParser.json());

app.use((req, res, next) => { 
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});



// app.post("/uploadSong", (req, res) => {
//     console.log("got upload song request");

//     const songAudio = req.file;

//     // get the status of the upload from the database
//     const dbResponse = true

//     // send back to frontend whether or not the db uploaded successfully
//     if (dbResponse) {
//         res.json({ status: 200 });
//     } else {
//         res.json({ status: 400 });
//     }
// });

app.get("/discover", (req, res) => {
    console.log("got discover request");

    // receiving input parameters
    const searchReq = req.query.searchReq;

    // maybe just a direct search for a username --> return their songs
    console.log("search value: ", searchReq);

    // pushing array of songs to the frontend as response
    res.json({ songs: ['song1', 'song2', 'song3'] });
});

app.get("/signUp", (req, res) => {
    console.log("got signUp request");

    const userName = req.query.username;
    const pass = req.query.password;

    console.log("req.query: ", req.query);
    console.log("username: ", userName);
    console.log("password: ", pass);

    // need to do some validation to make sure email/password

    // push these to the database for users

    // if the user was created, send created=true, else send with message describing error
    if (userName != "validUser") { // simulating username already exists
        res.json({ created: true, message: "user was created" });
    } else {
        res.json({ created: false, message: 'account not created: user already exists'});
    }
});

app.get("/likeSong", (req, res) => {
    console.log("got like song request");

    // receiving input parameters
    const songID = req.query.songID;
    
    console.log("req.query: ", req.query);
    console.log("songID: ", songID);

    // update the song's likes in db and send back status
    res.json({ status: 200 });
});

app.get("/trending", (req, res) => {
    console.log("got trending request");

    // idk what kind of search query we are going to do for db, but
    // i think we should do just some blanket search of the first 10 songs
    // in song page

    // sending back array of songs to frontend
    // need to change these to objects containing mp3, image, name, and artist
    res.json({ trending: ['trending1', 'trending2', 'trending3'] });
});

app.use("/api/todos", todoRoutes);
app.use("/api/users", userRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/auth", authRoutes);
// app.use("/api/songs", songRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});


////////////////////////////////////////
//          works for posing          //
//          only song                 //
////////////////////////////////////////

// Define a POST route to receive the song
// app.post("/uploadSong", upload.fields([
//     {name: 'Audio', maxCount: 1},
//     {name: 'Image', maxCount: 1},
// ]), (req, res) => {
    
//     // Get the files from the request
//     const audioFile = req.files['Audio'][0];
//     const imageFile = req.files['Image'][0];

//     // Create a unique filename for the file
//     const filename = `${Date.now()}-${file.originalname}`;
  
//     // Create a file object to upload to Firebase Storage
//     const fileObject = bucket.file(filename);
  
//     // Create a write stream to Firebase Storage
//     const stream = fileObject.createWriteStream({
//       metadata: {
//         contentType: file.mimetype
//       }
//     });
  
//     // Handle errors during the upload
//     stream.on("error", err => {
//       console.error(err);
//       res.status(500).send("Failed to upload file");
//     });
  
//     // Handle the end of the upload
//     stream.on("finish", async () => {
//       // Set the URL expiration time to one week
//       const expires = Date.now() + 7 * 24 * 60 * 60 * 1000;
  
//       // Get the signed URL for the file with the specified expiration time
//       const [url] = await fileObject.getSignedUrl({
//         action: "read",
//         expires
//       });
  
//       // Send the URL back to the client
//       res.json({ url });
//     });
  
//     // Pipe the file stream to the Firebase Storage write stream
//     stream.end(file.buffer);
//   });


////////////////////////////////////////
//          works for posing not      //
//          under folder              //
////////////////////////////////////////

// app.post("/uploadSong", upload.fields([
//     {name: 'Audio', maxCount: 1},
//     {name: 'Image', maxCount: 1},
// ]), async (req, res) => {
//     try {
//         // Get the files from the request
//         const audioFile = req.files['Audio'][0];
//         const imageFile = req.files['Image'][0];

//         // Create a unique filename for the file
//         const filename = `${Date.now()}-${audioFile.originalname}`;

//         // Create a file object to upload to Firebase Storage
//         const fileObject = bucket.file(filename);

//         // Create a write stream to Firebase Storage
//         const stream = fileObject.createWriteStream({
//             metadata: {
//                 contentType: audioFile.mimetype
//             }
//         });

//         // Handle errors during the upload
//         stream.on("error", err => {
//             console.error(err);
//             res.status(500).send("Failed to upload file");
//         });

//         // Handle the end of the upload
//         stream.on("finish", async () => {
//             // Set the URL expiration time to one week
//             const expires = Date.now() + 7 * 24 * 60 * 60 * 1000;

//             // Get the signed URL for the file with the specified expiration time
//             const [url] = await fileObject.getSignedUrl({
//                 action: "read",
//                 expires
//             });

//             // Create a new object to store in the Firebase database
//             const songObject = {
//                 name: req.body.name,
//                 userId: req.body.userId,
//                 audioUrl: url,
//                 imageUrl: ''
//             };

//             // Upload the image file to Firebase Storage
//             const imageFilename = `${Date.now()}-${imageFile.originalname}`;
//             const imageFileObject = bucket.file(imageFilename);
//             const imageStream = imageFileObject.createWriteStream({
//                 metadata: {
//                     contentType: imageFile.mimetype
//                 }
//             });
//             imageStream.on('error', err => {
//                 console.error(err);
//                 res.status(500).send("Failed to upload file");
//             });
//             imageStream.on('finish', async () => {
//                 const [imageUrl] = await imageFileObject.getSignedUrl({
//                     action: 'read',
//                     expires
//                 });
//                 // Update the song object with the image URL
//                 songObject.imageUrl = imageUrl;

//                 // Add the song object to the Firebase database
//                 const docRef = db.collection('songs').doc();
                
//                 const docId = docRef.id;
//                 songObject.id = docId;
//                 docRef.set(songObject)
//                     .then(() => {
//                         // Send the song object back to the client
//                         res.json(songObject);
//                     })
//                     .catch((err) => {
//                         console.error(err);
//                         res.status(500).send("Failed to add song to database");
//                     });
//             });
//             imageStream.end(imageFile.buffer);
//         });

//         // Pipe the audio file stream to the Firebase Storage write stream
//         stream.end(audioFile.buffer);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send("Failed to upload files");
//     }
// });
////////////////////////////////////////////////////////////

// app.post("/uploadSong", upload.fields([
//     {name: 'Audio', maxCount: 1},
//     {name: 'Image', maxCount: 1},
// ]), async (req, res) => {
//     try {
//         // Get the files from the request
//         const audioFile = req.files['Audio'][0];
//         const imageFile = req.files['Image'][0];
//         // const songName = req.body.songName;
//         const songName = "testingFolder3"

//         // Create a unique filename for the audio file
//         const audioFilename = `${Date.now()}-${audioFile.originalname}`;

//         // Create a file object to upload the audio file to Firebase Storage
//         const audioFileObject = bucket.file(`${songName}/${audioFilename}`);

//         // Create a write stream to Firebase Storage for the audio file
//         const audioStream = audioFileObject.createWriteStream({
//             metadata: {
//                 contentType: audioFile.mimetype
//             }
//         });

//         // Handle errors during the audio file upload
//         audioStream.on("error", err => {
//             console.error(err);
//             res.status(500).send("Failed to upload audio file");
//         });

//         // Handle the end of the audio file upload
//         audioStream.on("finish", async () => {
//             // Create a unique filename for the image file
//             const imageFilename = `${Date.now()}-${imageFile.originalname}`;

//             // Create a file object to upload the image file to Firebase Storage
//             const imageFileObject = bucket.file(`${songName}/${imageFilename}`);

//             // Create a write stream to Firebase Storage for the image file
//             const imageStream = imageFileObject.createWriteStream({
//                 metadata: {
//                     contentType: imageFile.mimetype
//                 }
//             });

//             // Handle errors during the image file upload
//             imageStream.on('error', err => {
//                 console.error(err);
//                 res.status(500).send("Failed to upload image file");
//             });

//             // Handle the end of the image file upload
//             imageStream.on('finish', async () => {
//                 // Set the URL expiration time to one week
//                 const expires = Date.now() + 7 * 24 * 60 * 60 * 1000;

//                 // Get the signed URL for the audio file with the specified expiration time
//                 const [audioUrl] = await audioFileObject.getSignedUrl({
//                     action: "read",
//                     expires
//                 });

//                 // Get the signed URL for the image file with the specified expiration time
//                 const [imageUrl] = await imageFileObject.getSignedUrl({
//                     action: 'read',
//                     expires
//                 });

//                 // Create a new object to store in the Firebase database
//                 const songObject = {
//                     name: req.body.name,
//                     userId: req.body.userId,
//                     audioUrl: audioUrl,
//                     imageUrl: imageUrl,
//                     id: null
//                 };

//                 // Add the song object to the Firebase database
//                 // const docRef = db.collection('songs').doc();

//                 // const docId = docRef.id;
//                 // songObject.id = docId;
//                 // docRef.set(songObject)
//                 //     .then(() => {
//                 //         // Send the song object back to the client
//                 //         res.json(songObject);
//                 //     })
//                 //     .catch((err) => {
//                 //         console.error(err);
//                 //         res.status(500).send("Failed to add song to database");
//                 //     });
//             });

//             // Pipe the image file stream to the Firebase Storage write stream
//             imageStream.end(imageFile.buffer);
//         });

//         // Pipe the audio file stream to the Firebase Storage write stream
//         audioStream.end(audioFile.buffer);

//         res.status(200).send("Think this bitch be working");
//     } catch (err)  {
//         console.log(err)
//         res.status(500).send("Error uploading the files");
//     }
// });
// app.get("/validateLogin", (req, res) => {
//     console.log("got verification request");

//     // receiving input parameters
//     const userName = req.query.username;
//     const pass = req.query.password;

//     console.log("req.query: ", req.query);
//     console.log("username: ", userName);
//     console.log("password: ", pass);

//     // validate that this is a user, and return a loginToken
//     // loginToken doesn't need to be secure so maybe just email == the userID == loginToken
    
//     // login Token will be stored on client side, and will be passed to 
//     // the server to get user's songs/playlists

//     if (userName === "validUser" && pass === "validPass") {
//         // username + password present in db, send back userID as loginToken
//         res.json({ valid: true, token: 'thisIsSomeUserToken' });
//     } else {
//         // user/pass did not match in the database, send back invalid
//         res.json({ valid: false, token: null });
//     }
// });
// app.get("/accountInfo", (req, res) => {
//     console.log("got accountInfo request");

//     const userID = req.query.userID;
//     console.log('userID: ' + userID);

//     // need to take userID and get songs/playlists

//     res.json({ songs: [1, 2, 3, 4, 5, 6, 7, 8], playlists: [1, 2, 3, 4] });
// });
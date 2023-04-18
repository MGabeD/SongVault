const express = require("express");
const multer = require("multer");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const todoRoutes = require("./routes/todos.js");
const userRoutes = require("./routes/users.js");
const requestRoutes = require("./routes/requests.js");
const authRoutes = require("./routes/auth.js");
const songRoutes = require("./routes/songs.js");
const likeRoutes = require("./routes/like.js");
const discRoutes = require("./routes/discover.js");
const playRoutes = require("./routes/play.js");
const trenRoutes = require("./routes/trending.js");
const playListRoutes = require("./routes/playlists.js");

const PORT = process.env.PORT || 3001;

const { initializeFirebase } = require('./utils/firebase');

main()
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
    
async function main() {
    await initializeFirebase();
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

app.get("/discover", (req, res) => {
    console.log("got discover request");

    // receiving input parameters
    const searchReq = req.query.searchReq;

    // maybe just a direct search for a username --> return their songs
    console.log("search value: ", searchReq);

    // pushing array of songs to the frontend as response
    res.json({ songs: ['song1', 'song2', 'song3'] });
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
app.use("/api/songs", songRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/discover", discRoutes);
app.use("/api/play", playRoutes);
app.use("/api/trending", trenRoutes);
app.use("/api/playlists", playListRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);

// start the server

});

async function downloadFile(fileName) {
    const file = bucket.file(fileName);
    const [fileBuffer] = await file.download();
    return fileBuffer;
}


app.get('/download', (req, res) => {
    // const fileName = req.params.fileName;

    const folderName = '/undefined';
    const fileName = 'githubPfP.jpeg'
    const fileRef = storage.ref().child(`${folderName}/${fileName}`);

    fileRef.getDownloadURL()
    .then(url => {
        // send the file URL to the client
        res.status(200).send({ url });
    })
    .catch(error => {
        console.log(error);
        res.status(404).send('File not found');
    });
});
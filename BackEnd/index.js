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
const MONGO = process.env.MONGO || "129.114.27.13:27017/test";

const { initializeFirebase } = require('./utils/firebase');

main()
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
    
async function main() {
    await initializeFirebase();
    // console.log("mongodb://" + MONGO);
    await mongoose.connect("mongodb://" + MONGO);
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

// async function downloadFile(fileName) {
//     const file = bucket.file(fileName);
//     const [fileBuffer] = await file.download();
//     return fileBuffer;
// }
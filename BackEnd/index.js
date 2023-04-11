const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const todoRoutes = require("./routes/todos.js");
const userRoutes = require("./routes/users.js");
const requestRoutes = require("./routes/requests.js");

const PORT = 3001;

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
    next();
});
// app.use(bodyParser.urlencoded( { extended: false } ));

app.get("/api", (req, res) => {
    console.log("got request");

    // receiving input parameters
    console.log("req.query: ", req.query);
    console.log("user: ", req.query.user)

    // sending a json response
    res.json({ message: "Hello from server!" });
});

app.get("/validateLogin", (req, res) => {
    console.log("got verification request");

    // receiving input parameters
    const userName = req.query.username;
    const pass = req.query.password;

    console.log("req.query: ", req.query);
    console.log("username: ", userName);
    console.log("password: ", pass);

    if (userName === "validUser" && pass === "validPass") {
        res.json({ valid: true, token: 'thisIsSomeUserToken' });
    } else {
        res.json({ valid: false, token: null });
    }

    
});

app.get("/uploadSong", (req, res) => {
    console.log("got upload song request");

    // receiving input parameters
    const songName = req.query.Name;
    const songAudio = req.query.Audio;
    const songImg = req.query.Image;

    console.log("req.query: ", req.query);
    console.log("songName: ", songName);
    console.log("songAudio: ", songAudio);
    console.log("songImg: ", songImg);

    res.json({ status: 200 });
    
});



app.get("/discover", (req, res) => {
    console.log("got discover request");

    // receiving input parameters
    const searchReq = req.query.searchReq;

    console.log("search value: ", searchReq);

    res.json({ songs: ['song1', 'song2', 'song3'] });
});


app.get("/signUp", (req, res) => {
    console.log("got signUp request");

    // receiving input parameters
    const userName = req.query.username;
    const pass = req.query.password;

    console.log("req.query: ", req.query);
    console.log("username: ", userName);
    console.log("password: ", pass);

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

    
    res.json({ status: 200 });
});

app.get("/trending", (req, res) => {
    console.log("got trending request");

    res.json({ trending: ['trending1', 'trending2', 'trending3'] });
});

app.use("/api/todos", todoRoutes);
app.use("/api/users", userRoutes);
app.use("/api/requests", requestRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});


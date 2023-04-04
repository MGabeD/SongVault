// import mongoose from "mongoose";
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const todoRoutes = require("./routes/todos.js");
const userRoutes = require("./routes/users.js");
const requestRoutes = require("./routes/requests.js");

main()
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect("mongodb://129.114.27.13:27017/test")
    // await mongoose.connect("mongodb://localhost:27017/test");
} 
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded( { extended: false } ));

app.get("/", (req, res) => {
    res.send("hello world");
});

app.use("/api/todos", todoRoutes);
app.use("/api/users", userRoutes);
app.use("/api/requests", requestRoutes);

app.listen(8080, () => {
    console.log("listening on port 8080");
})


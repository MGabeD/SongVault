const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    
    userName : { type: String, required: true },
    password : { type: String, required: true},
    firstName : { type: String, required: false },
    lastName : { type: String, required: false },
    email : { type: String, required: true },
    stageName : { type: String, required: true },
    birthday : {type: String, required: true },
    bio : {type: String, required: true },
    hyperLinks: { type: [String], default: [], required: true },
    followers: { type: [String], default: [], required: true },
    friends: { type: [String], default: [], required: true },
    songs: { type: [String], default: [], required: true },
    playlists: { type: [String], default: [], required: true},

});

module.exports = mongoose.model("User", userSchema);
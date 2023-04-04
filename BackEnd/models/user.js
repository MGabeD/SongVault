const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    
    firstName : { type: String, required: true },
    lastName : { type: String, required: true },
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
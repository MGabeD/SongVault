const mongoose = require("mongoose");

const playlistSchema = mongoose.Schema({

    name: { type: String, required: true },
    songs: { type: [String], default: [], required: true},
    owner: { type: String, required: true },
    followers: { type: [String], default: [], required: true },
    imageLink: { type: String, required: false }
    
});

module.exports = mongoose.model("Playlist", playlistSchema);
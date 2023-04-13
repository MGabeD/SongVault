const mongoose = require("mongoose");

const songSchema = mongoose.Schema({

    name: { type: String, required: true },
    artist: { type: [String], required: true },
    likes: { type: Number, default: 0, required: true },
    plays: { type: Number, default: 0, required: true }
    
});

module.exports = mongoose.model("Song", songSchema);
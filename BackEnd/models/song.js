const mongoose = require("mongoose");

const songSchema = mongoose.Schema({

    title: { type: String, required: true },
    artist: { type: [String], required: true },
    
    
});

module.exports = mongoose.model("Request", requestSchema);
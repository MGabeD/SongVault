const mongoose = require("mongoose");

const requestSchema = mongoose.Schema({

    sender: { type: String, required: true },
    receiver: { type: String, required: true },
    
});

module.exports = mongoose.model("Request", requestSchema);
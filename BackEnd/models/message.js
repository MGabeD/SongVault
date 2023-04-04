const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
    
    Sender : { type: String, default: "Anonymous", required: true },
    content : { type: String, default: "New Group Chat", required: true },
    upvotes : { type: Number, default: 0, required: true },

});

module.exports = mongoose.model("Message", messageSchema);
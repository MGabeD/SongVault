const mongoose = require("mongoose");

const conversationSchema = mongoose.Schema({
    
    users : { type: [String], default: [], required: true },
    title : { type: String, default: "New Group Chat", required: true },
    // image : { id: String },
    // messages : { type: [{ sender: { 
    //     type: String, required: true, 
    //     body: { type: String, required: true,
    //      } } }], default: [], required: true}
    // firstName : { type: String, required: true },
    // lastName : { type: String, required: true },
    // email : { type: String, required: true },
    // stageName : { type: String, required: true },
    // birthday : {type: String, required: true },
    // bio : {type: String, required: true },
    // hyperLinks: { type: [String], default: [], required: true },

});

module.exports = mongoose.model("Conversation", conversationSchema);
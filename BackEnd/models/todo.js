// THIS IS SIMPLY A TEMPLATE FOR HOW WE ARE BUILDING BACKEND APIS

const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({

    title: { type: String, required: true},
    content: { type: String, required: true},
    date: { type: String, required: true},
    
});

module.exports = mongoose.model("Todo", todoSchema);


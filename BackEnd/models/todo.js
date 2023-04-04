const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    title: { type: String, require: true},
    content: { type: String, require: true},
    date: { type: String, require: true},
});

module.exports = mongoose.model("Todo", todoSchema);
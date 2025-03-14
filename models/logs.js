const mongoose = require("mongoose");

const logSchema = mongoose.Schema({
    id: {type: String, required: true, unique: true},
    cpu: {type: String, required: true},
    ram: {type: String, required: true},
    date: {type: Date, required: true},
}, {collection: "logs"});

const logs = mongoose.model("log", logSchema);
module.exports = {
    logs,
};
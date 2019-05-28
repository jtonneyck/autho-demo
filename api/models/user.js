const mongoose = require("mongoose")
const Schema = mongoose.Schema

module.exports = mongoose.model("user", new Schema({
    username: String,
    password: String,
}))
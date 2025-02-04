const mongoose = require("mongoose");

const Userschema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true }
}, { versionKey: false })


const Usermodel = mongoose.model("user", Userschema);

module.exports = Usermodel



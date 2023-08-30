const mongoose = require('mongoose');

const user = mongoose.Schema({
    user: { type: String, required: true },

    timestamp: { type: Date,  unique: true }

})

const usermodel = mongoose.model("User", user);
module.exports = usermodel;
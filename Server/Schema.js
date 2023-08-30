const mongoose = require('mongoose');

const user = mongoose.Schema({
    data:[{
        name:{type:String , required:true},
    origin:{type:String , required:true},
    destination:{type:String , required:true},
    }],
    timestamp: { type: Date,  unique: true }

})

const usermodel = mongoose.model("User", user);
module.exports = usermodel;
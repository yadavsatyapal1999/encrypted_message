
const express = require('express');
const User = require('./Schema');
const userRouter = express.Router()





userRouter.get('/getpost', async (req,res)=>{
    
    console.log("reached get")
    const lastpost = await User.findOne({}, {}, { sort: { _id: -1 } }, function (err, post) {
        return post;
    });

 res.status(200).send(lastpost);

})

module.exports = userRouter ;

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email:String,
    firstName:String,
    lastName:String,
    mobile:Number,
    gender:String,
    password:String
})

module.exports = mongoose.model('user',userSchema)
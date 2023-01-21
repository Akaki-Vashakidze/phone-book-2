const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router() 
const User = require('../models/user')
const mongoose = require('mongoose')

const db = 'mongodb+srv://akak1:7p0DJkDvPtMdDQuQ@cluster0.fcpniir.mongodb.net/phone-book-2?retryWrites=true&w=majority'

mongoose.connect(db,err => {
 if(err) {
    console.log('Erroooooooor!!!' + err)
 } else {
    console.log('connected to mongoDB')
 }
})

router.get('/',(req,res)=> {
    res.send('From Api routes')
})

router.post('/register',(req,res) => {
    let userData = req.body
    let user = new User(userData)
    user.save((error,registeredUser) => {
        if(error) {
            console.log(error)
        } else {
            let payload = {subject:registeredUser._id}
            let token = jwt.sign(payload,'secretKey')
            res.status(200).send({token})
        }
    })
})

router.post('/login',(req,res) => {
    let userData = req.body
    User.findOne({email:userData.email},(error,user) => {
        if (error) {
            console.log(error)
        } else {
            if(!user) {
                res.status(401).send("Invalid Email")
            } else
            if(user.password !== userData.password) {
                 res.status(401).send('Invalid password')
            } else {
                let payload = {subject:user._id}
                let token = jwt.sign(payload,'secretKey')
                res.status(200).send({token})
            }
        }
    })
})

module.exports = router
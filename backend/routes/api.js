const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/user')
const mongoose = require('mongoose')

const db = 'mongodb+srv://akak1:7p0DJkDvPtMdDQuQ@cluster0.fcpniir.mongodb.net/phone-book-2?retryWrites=true&w=majority'

mongoose.connect(db, err => {
    if (err) {
        console.log('Erroooooooor!!!' + err)
    } else {
        console.log('connected to mongoDB')
    }
})

router.get('/', (req, res) => {
    res.send('From Api routes')
})

router.post('/addContact',(req,res) => {
    let Data = req.body
    User.findOneAndUpdate ({
      email:Data.userEmail
     },{
       $push:{
         contacts:Data.newContact
       }
     },(err) => (
       console.log(err)
     ))

     User.findOne({email:Data.userEmail},(error,user)=>{
      if(error) {
        console.log(error)
      } else {
        if(user) {
            //sending chosen user
            res.status(201).send(user.contacts)
        }
      }
     })
})

router.post('/register', (req, res) => {
    let userData = req.body
    User.findOne({ email: userData.email }, (error, user) => {
        if (error) {
            console.log(error)
        } else {
            if (user) {
                console.log(user)
                console.log('user email is taken')
                res.status(401).send('User Email is Taken')
            } else {
                let user = new User(userData)
                user.save((error, registeredUser) => {
                    if (error) {
                        console.log(error)
                    } else {
                        let payload = { subject: registeredUser._id }
                        let token = jwt.sign(payload, 'secretKey')
                        res.status(200).send({ token })
                    }
                })
            }
        }
    })

})

router.post('/numbers', verifyToken, (req, res) => {
    let userData = req.body
    console.log(req.body)
    User.findOne({ email: userData.email }, (error, user) => {
        if (error) {
            console.log(error)
        } else {
            if (user) {
                console.log(user)
                res.send(user.contacts)
            } 
        }
    })
})

router.post('/login', (req, res) => {
    let userData = req.body
    User.findOne({ email: userData.email }, (error, user) => {
        if (error) {
            console.log(error)
        } else {
            if (!user) {
                res.status(401).send("Invalid Email")
            } else
                if (user.password !== userData.password) {
                    res.status(401).send('Invalid password')
                } else {
                    let payload = { subject: user._id }
                    let token = jwt.sign(payload, 'secretKey')
                    res.status(200).send({ token })
                }
        }
    })
})

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token, 'secretKey')
    if (!payload) {
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject
    next()
}

module.exports = router
const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/user')
const mongoose = require('mongoose')
const bcrypt = require("bcrypt")
const saltRounds = 10

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

router.post('/addContact', async (req, res) => {
  try {
    let Data = req.body
    await User.findOneAndUpdate({ email: Data.userEmail }, { $push: { contacts: Data.newContact } })
    const user = await User.findOne({ email: Data.userEmail })
    res.status(201).send(user.contacts)
  }

  catch (error) {
    res.status(500).send("something went wrong")
  }
})

router.post('/deleteNumber', async (req, res) => {
  try {
    let Data = req.body
    await User.updateOne({ email: Data.email }, { $set: { contacts: Data.numbersArray } })
    const user = await User.findOne({ email: Data.email })
    res.status(201).send(user.contacts)
  }
  catch (error) {
    res.status(500).send("something went wrong")
  }
})

router.post('/register', async (req, res) => {
  try {
    let userData = req.body

    bcrypt
      .genSalt(saltRounds)
      .then(salt => {
        console.log('Salt: ', salt)
        return bcrypt.hash(userData.password, salt)
      })
      .then(hash => {
        console.log('Hash: ', hash)
        userData.password = hash;
      })
      .catch(err => console.error(err.message))

    const user = await User.findOne({ email: userData.email })
    if (user) {
      res.status(401).send('User Email is Taken')
    } else {
      let user = new User(userData)
      user.save((error, registeredUser) => {
        let payload = { subject: registeredUser._id }
        let token = jwt.sign(payload, 'secretKey')
        res.status(200).send({ token })
      })
    }
  }
  catch (error) {
    res.status(500).send("something went wrong")
  }


})

router.post('/numbers', verifyToken, async (req, res) => {
  try {
    let userData = req.body
    const user = await User.findOne({ email: userData.email })
    res.status(201).send(user.contacts)
  }
  catch (error) {
    res.status(500).send("something went wrong")
  }
})


router.post('/editNumber', async (req, res) => {
  try {
    let Data = req.body
    await User.updateOne({ email: Data.email }, { $set: { contacts: Data.numbersArray } })

    const user = await User.findOne({ email: Data.email })
    res.status(201).send(user.contacts)
  }
  catch (error) {
    res.status(500).send("something went wrong")
  }
})

function compareHush(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword)
}


router.post('/login', async (req, res) => {
  try {
    let userData = req.body
    User.findOne({ email: userData.email }, (error, user) => {
      if (compareHush(userData.password, user.password)) {
        let payload = { subject: user._id }
        let token = jwt.sign(payload, 'secretKey')
        res.status(200).send({ token })
      }
    })
  }
  catch (error) {
    res.status(500).send("something went wrong")
  }
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
const express = require('express')
const { UserModel } = require('../model/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userRoute = express.Router()

userRoute.post('/register', async (req, res) => {
  try {
    let userData = req.body

    bcrypt.hash(userData.password, 3, async function (err, hash) {
      if (hash) {
        userData.password = hash
        const newUser = new UserModel(userData)
        await newUser.save()
        res.status(201).send({ msg: 'user has been registerd' })
      } else {
        console.log(err)
        res.status(400).send({ msg: 'registration failed' })
      }
    })
  } catch (error) {
    console.log(error)
    res.status(400).send({ msg: 'registration failed' })
  }
})
userRoute.post('/login', async (req, res) => {
  try {
    let userData = req.body
    let userInDB = await UserModel.find({ email: userData.email })
    console.log(userInDB)

    if (userInDB.length == 0) {
      return res.status(400).send({ msg: 'user not found' })
    }
    userInDB = userInDB[0]

    bcrypt
      .compare(userData.password, userInDB.password)
      .then(function (result) {
        if (result) {
          let token = jwt.sign(
            { userId: userInDB._id, isAdmin: userInDB.isAdmin },
            'secret'
          )
          console.log(token)
          res.status(201).send({ msg: 'login success', token })
        } else {
          res.status(400).send({ msg: 'user not found' })
        }
      })
  } catch (error) {
    console.log(error)
    res.status(400).send({ msg: 'registration failed' })
  }
})

module.exports = { userRoute }

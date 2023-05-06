const mongoose = require('mongoose')

const userSchema = {
  name: String,
  email: String,
  password: String,
  isAdmin: Boolean,
}

const UserModel = mongoose.model('user', userSchema)

module.exports = { UserModel, userSchema }

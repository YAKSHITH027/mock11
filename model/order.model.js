const mongoose = require('mongoose')
const { userSchema } = require('./user.model')
const { bookSchema } = require('./book.model')

const orderSchema = {
  user: userSchema,
  books: [bookSchema],
  totalAmount: Number,
}

const OrderModel = mongoose.model('order', orderSchema)

module.exports = { OrderModel }

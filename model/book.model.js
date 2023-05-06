const mongoose = require('mongoose')

const bookSchema = {
  title: String,
  author: String,
  category: String,
  price: Number,
  quantity: Number,
}

const BookModel = mongoose.model('book', bookSchema)

module.exports = { BookModel }

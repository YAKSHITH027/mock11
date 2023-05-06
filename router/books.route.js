const express = require('express')
const { BookModel } = require('../model/book.model')
const { protectedAuth } = require('../middleware/admin.middleware')
const booksRoute = express.Router()

booksRoute.get('/:bookId', async (req, res) => {
  try {
    console.log(req)
    let data = await BookModel.findOne({ _id: req.params.bookId })
    res.status(200).send({ data })
  } catch (error) {
    res.status(400).send({ msg: 'books not found' })
  }
})
booksRoute.get('/', async (req, res) => {
  try {
    const { author, category } = req.query
    console.log(author, category)
    let query = {}
    if (author) query.author = author
    if (category) query.category = category
    let data = await BookModel.find(query)
    res.status(200).send({ data })
  } catch (error) {
    res.status(400).send({ msg: 'books not found' })
  }
})

booksRoute.post('/', protectedAuth, async (req, res) => {
  try {
    let obj = req.body
    let newBook = new BookModel(obj)
    await newBook.save()
    res.status(200).send({ msg: 'book added' })
  } catch (error) {
    res.status(400).send({ msg: 'books failed' })
  }
})
booksRoute.patch('/:id', protectedAuth, async (req, res) => {
  try {
    let obj = req.body
    let bookId = req.params
    console.log(obj, bookId)
    await BookModel.findByIdAndUpdate({ _id: bookId.id }, obj)
    res.status(204).send({ msg: 'book updated' })
  } catch (error) {
    res.status(400).send({ msg: 'books update failed' })
  }
})
booksRoute.delete('/:id', protectedAuth, async (req, res) => {
  try {
    let bookId = req.params

    console.log(bookId)
    await BookModel.findByIdAndDelete({ _id: bookId.id })
    res.status(204).send({ msg: 'book deleted' })
  } catch (error) {
    res.status(400).send({ msg: 'books delete failed' })
  }
})

module.exports = { booksRoute }

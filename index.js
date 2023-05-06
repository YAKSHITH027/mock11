const express = require('express')
const cors = require('cors')
const { connection } = require('./db')
const { userRoute } = require('./router/user.route')
const { booksRoute } = require('./router/books.route')
require('dotenv').config()
const app = express()

//middleware
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('hello')
})
app.use('/user', userRoute)
app.use('/books', booksRoute)
// console.log(process.env)
app.listen(8080, async () => {
  try {
    await connection
    console.log('db is connected')
  } catch (error) {
    console.log('db connection failed')
  }
  console.log('port is running')
})

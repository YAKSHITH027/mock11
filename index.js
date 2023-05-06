const express = require('express')
const cors = require('cors')
const { connection } = require('./db')
const { userRoute } = require('./router/user.route')
const { booksRoute } = require('./router/books.route')
const { orderRoute } = require('./router/order.route')
const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')
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
app.use('/order', orderRoute)
// console.log(process.env)
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'bookstore app',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'https://jade-sparkling-rabbit.cyclic.app',
      },
    ],
  },
  apis: ['./route*.js'], // files containing annotations as above
}

const openapiSpecification = swaggerJsdoc(options)

app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification))

app.listen(8080, async () => {
  try {
    await connection
    console.log('db is connected')
  } catch (error) {
    console.log('db connection failed')
  }
  console.log('port is running')
})

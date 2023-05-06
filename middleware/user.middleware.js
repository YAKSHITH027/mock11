const jwt = require('jsonwebtoken')
const userAuth = async (req, res, next) => {
  let token = req.headers.authorization
  console.log('token here', token)
  try {
    jwt.verify(token, 'secret', function (err, decoded) {
      if (decoded) {
        console.log(decoded) // bar
        // req.body.userId = decoded.userId
        next()
      } else {
        res.status(400).send({ msg: err })
      }
    })
  } catch (error) {
    console.log(error)
    res.send('login first')
  }
}
module.exports = { userAuth }

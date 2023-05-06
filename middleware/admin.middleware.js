const jwt = require('jsonwebtoken')
const protectedAuth = async (req, res, next) => {
  let token = req.headers.authorization
  console.log('token here', token)
  try {
    jwt.verify(token, 'secret', function (err, decoded) {
      if (decoded.isAdmin) {
        console.log(decoded) // bar
        next()
      } else {
        res.status(400).send({ msg: err })
      }
    })
  } catch (error) {
    console.log(error)
    res.send('lost')
  }
}
module.exports = { protectedAuth }

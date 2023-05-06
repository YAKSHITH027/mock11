const express = require('express')
const { userAuth } = require('../middleware/user.middleware')
const { OrderModel } = require('../model/order.model')
const { protectedAuth } = require('../middleware/admin.middleware')
const orderRoute = express.Router()

orderRoute.post('/', userAuth, async (req, res) => {
  try {
    let obj = req.body
    let newOrder = new OrderModel(obj)
    await newOrder.save()
    res.status(200).send({ msg: 'order added' })
  } catch (error) {
    res.status(400).send({ msg: 'order failed' })
  }
})
orderRoute.get('/orders', protectedAuth, async (req, res) => {
  try {
    let data = await OrderModel.find()
    res.status(200).send({ data })
  } catch (error) {
    res.status(400).send({ msg: 'order not found' })
  }
})
module.exports = { orderRoute }

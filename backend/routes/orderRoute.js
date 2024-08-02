const express = require('express')
const { placeOrder, verifyOrder, userOrder, listOders, updateStatus } = require('../controllers/orderController')
const authMiddleware = require('../middleware/auth')

const orderRouter = express.Router()

orderRouter.post('/place', authMiddleware, placeOrder)
orderRouter.post('/verify', verifyOrder)
orderRouter.post('/userorders', authMiddleware, userOrder)
orderRouter.get('/list', listOders)
orderRouter.post('/status', updateStatus)

module.exports = orderRouter
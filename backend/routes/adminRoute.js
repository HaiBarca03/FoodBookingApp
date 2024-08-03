const express = require('express')
const { createAdmin, loginAdmin } = require('../controllers/adminContrller')

const adminRouter = express.Router()

adminRouter.post('/login', loginAdmin)
adminRouter.post('/register', createAdmin)

module.exports = adminRouter

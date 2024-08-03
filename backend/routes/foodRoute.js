const express = require('express')
const { addFood, listFood, removeFood } = require('../controllers/foodController')
const authMiddleware = require('../middleware/auth')
const authList = require('../middleware/authList')
const multer = require('multer')

const foodRouter = express.Router()

// image store
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

const uploads = multer({ storage: storage })

foodRouter.post('/add', uploads.single('image'), addFood)
foodRouter.get('/list', listFood)
foodRouter.post('/remove', removeFood)

module.exports = foodRouter
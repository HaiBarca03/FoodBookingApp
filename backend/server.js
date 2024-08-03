const express = require('express')
const cors = require('cors')
const dbConnect = require('./config/db')
const foodRouter = require('./routes/foodRoute')
const userRouter = require('./routes/userRoute')
const cartRouter = require('./routes/cartRoute')
const orderRouter = require('./routes/orderRoute')
const adminRouter = require('./routes/adminRoute')

// app config
require('dotenv').config()
const app = express()
const port = 3000
const path = require('path');


//middleware
app.use(express.json())
app.use(cors())

//db connect
dbConnect()

// api endpoints
app.use('/api/food', foodRouter)
app.use('/images', express.static(path.join(__dirname, 'uploads')));
app.use('/api/user', userRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)
app.use('/api/admin', adminRouter)


app.get('/', function (req, res) {
    res.send('Hello World')
})

app.listen(port, () => {
    console.log(`App running on port: ${port}`)
})
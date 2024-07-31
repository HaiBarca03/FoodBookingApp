const express = require('express')
const cors = require('cors')
const dbConnect = require('./config/db')
const foodRouter = require('./routes/foodRoute')


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


app.get('/', function (req, res) {
    res.send('Hello World')
})

app.listen(port, () => {
    console.log(`App running on port: ${port}`)
})
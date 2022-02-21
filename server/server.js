const express = require('express')
const dotenv = require('dotenv').config()
const { errorHandler } = require('../server/middleware/errorMiddleware')
const colors = require('colors')
const conncectDB = require('./config/db')
const cors = require('cors')
const port = process.env.PORT || 5000


conncectDB()

const app = express()

app.use(cors({
    origin: 'http://localhost:3000'
}))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/goods', require('./routes/goodsRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server running on port ${port}`))
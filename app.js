require('dotenv').config({path:'.env'})
// const dotenv = require('dotenv')
require('express-async-errors')

const express = require('express')
const app = express()

const pRouter = require('./routes/routes')
const connectDB = require('./db/connect')

const errorHandler = require('./middleware/error-handler')
const notFound = require('./middleware/not-found')

// dotenv.config({path:'.env'})
const port = process.env.PORT || 3040
app.use(express.json())

app.get('/', (req,res)=>{
    res.send(`<h1>Store api</h1><a href="/api/v1/products">Products</a>`)
})

app.use('/api/v1/products', pRouter)

app.use(errorHandler)
app.use(notFound)


const start = async ()=>{
    try {
        // await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server listening on port ${port}`))
    } catch (error) {
        console.log(error);
    }
} 

start()
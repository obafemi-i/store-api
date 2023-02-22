const mongoose = require('mongoose')

require('dotenv').config({path:'.env'})
const connectDB = require('./db/connect')

const products = require('./models/models')
const jsonProducts = require("./products.json")

const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        await products.deleteMany()
        await products.create(jsonProducts)
        console.log('Success!!')
        process.exit(0)
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

start()
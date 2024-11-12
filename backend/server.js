const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./Database/database')
const routes = require('./Routes/routes')

const app = express()
dotenv.config()

app.use(express.json())
app.use('/api/v1/fb',routes)

const PORT = process.env.PORT || 3000

const start = async () =>{
    try {
        await connectDB(process.env.MONGO_URI, ()=>{console.log('Database connected')})
        app.listen(PORT, ()=>{console.log('Server is listening on ', PORT,'...')})
    } catch (error) {
        console.log('Server/DB failed to launch!!')
        console.log(error)
    }
}

start()
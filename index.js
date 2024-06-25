import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

import userRoutes from './routes/User.route.js'
import hotelRoutes from './routes/Hotel.route.js'
import roomRoutes from './routes/Room.route.js'
import searchRoute from './routes/Search.route.js'
import bookingRoute from './routes/Booking.route.js'
import filterRoute from './routes/Filter.route.js'

dotenv.config()
const app = express()

const corsOptions = {
    origin: true,
    credentials: true
}

// let uri = "mongodb+srv://abhayvidja09:abhay09@cluster0.qppk5bp.mongodb.net/Hotel"

let uri = 'mongodb://localhost:27017/hotel-booking'

mongoose.set('strictQuery', false)
const connect = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log('MongoDb database connected')
    } catch (error) {
        console.log(error)
        console.log("MongoDb database connection failed")
    }
}

app.use(express.json())
app.use(cors(corsOptions))

app.use('/api/user' , userRoutes)
app.use('/api/hotel' , hotelRoutes)
app.use('/api/room' , roomRoutes)
app.use('/api/search' , searchRoute)
app.use('/api/booking' , bookingRoute)
app.use('/api/filter' , filterRoute)

app.listen(3000 , () => {
    connect()
    console.log('Server is running on port 3000')
})
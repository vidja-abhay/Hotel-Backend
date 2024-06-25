import express from 'express'

import { createBooking, deleteBooking, getAllBooking, getAllBookingByUser, getAllBookingsByRoom, getSingleBooking, updateBooking } from '../controllers/Booking.controller.js'

const router = express.Router()

// CREATE BOOKING
router.post('/createBooking' , createBooking)

// DELETE BOOKING
router.delete('/deleteBooking/:id' , deleteBooking)

// UPDATE BOOKING
router.put('/updateBooking/:id' , updateBooking)

// GET ALL BOOKING
router.get('/' , getAllBooking)

// GET SINGLE BOOKING
router.get('/getSingleBooking/:id' , getSingleBooking)

// GET ALL BOOKING BY ROOM
router.get('/getAllBookingByRoom/:id' , getAllBookingsByRoom)

// GET ALL BOOKING BY USER
router.get('/getAllBookingByUser/:id' , getAllBookingByUser)

export default router
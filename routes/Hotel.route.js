import express from 'express'

import {createHotel , deleteHotel, getAllHotel , getSingleHotel, updateHotel } from '../controllers/Hotel.controller.js'

const router = express.Router()

// CREATE HOTEL
router.post('/createHotel', createHotel);

// GET ALL HOTEL
router.get('/getAllHotel', getAllHotel)

// GET SINGLE HOTEL
router.get('/getSingleHotel/:id', getSingleHotel )

// UPDATE HOTEL
router.put('/updateHotel/:id' , updateHotel)

// DELETE HOTEL
router.delete('/deleteHotel/:id', deleteHotel)

export default router
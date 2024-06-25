import express from 'express'

import { createRoom, DeleteRoom, getAllAvailableRooms, getAllAvailableRoomsByHotel, getAllRoomByHotel, getAllRooms, getSingleRoom, updateRoom } from '../controllers/Room. controller.js'

const router = express.Router()

// CREATE ROOM
router.post('/createRoom' , createRoom)

// UPDATE ROOM
router.put('/updateRoom/:id' , updateRoom)

// DELETE ROOM
router.delete('/deleteRoom/:id' , DeleteRoom)

// GET ALL ROOMS
router.get('/' , getAllRooms)

// GET SINGLE ROOM
router.get('/getSingleRoom/:id' , getSingleRoom)

// GET ALL ROOM BY HOTEL
router.get('/getAllRoomByHotel/:hid' , getAllRoomByHotel)

// GET ALL AVAILABLE ROOM
router.get('/getAllAvailableRoom' , getAllAvailableRooms)

// GET ALL AVAILABLE ROOM W.R.T PARTICULAR HOTEL
router.get('/getAllAvailableRoomByHotel/:id' , getAllAvailableRoomsByHotel)

export default router
import express from 'express'

import { getAllRoomsSortedByPriceHighestToLowest, getAllRoomsSortedByPriceLowestToHighest, getRoomsByPriceRange } from '../controllers/Filter.controller.js'

const router = express.Router()

// FETCH ROOM HIGHEST PRICE TO LOWEST PRICE
router.get('/highetToLowest' , getAllRoomsSortedByPriceHighestToLowest)

// FETCH ROOM LOWEST PRICE TO HIGHEST PRICE
router.get('/lowestToHighest' , getAllRoomsSortedByPriceLowestToHighest)

// FETCH ROOM BY PRICE RANGE
router.get('/byPriceRange' , getRoomsByPriceRange)

export default router
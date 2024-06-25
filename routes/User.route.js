import express from 'express'
import { getAllUser, signIn, signUp , getSingleUser , updateUser } from '../controllers/User.controller.js'

const router = express.Router()

// GET ALL USER
router.get('/' , getAllUser)

// GET SINGLE USER
router.get('/getSingleUser/:id' , getSingleUser)

// REGISTER USER 
router.post('/signUp' , signUp)

// LOGIN USER
router.post('/signIn' , signIn)

// UPDATE USER
router.put('/updateUser/:id' , updateUser)


export default router
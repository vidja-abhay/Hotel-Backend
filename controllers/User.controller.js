import User from "../models/User.model.js"
import {errorHandler} from "../utils/Error.js"
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const getAllUser = async (req , res , next) => {
    try {
        const user = await User.find()

        if(!user) {
            return next(errorHandler(400 , "No User Found"))
        }

        res.status(200).json({
            message : "Get all the user successfully!",
            data : user
        })
    } catch (error) {
        next(error)
    }
}

export const getSingleUser = async (req , res , next) => {
    const id = req.params.id

    try {
        const getUser = await User.findById(id)

        if(!getUser) {
            return next(errorHandler(400, 'No Blog Found'))
        }

        res.status(200).json({
            success: true,
            message: 'Successfully get',
            data: getUser
        })
    } catch (error) {
        next(error)
    }
}

export const signUp = async (req, res , next) => {
    const { username, email, password } = req.body

    if (!username || !email || !password || username === '' || email === '' || password === '') {
        return next(errorHandler(400 , 'All fields are required'))
    }

    const user = await User.findOne({email})

    if(user) {
        return next(errorHandler(400 , 'User Alreay Exist! , Please Sign In'))
    }

    const hashedPassword = bcryptjs.hashSync(password , 10);

    const newUser = new User({
        username,
        email,
        password : hashedPassword,
        bookings : []
    })

    try {
        await newUser.save()

        res.json({
            message: "Sign Up successfully!",
            data: newUser
        })
    } catch (error) {
        next(error)
    }

}

export const signIn = async (req , res , next) => {
    const {email , password} = req.body

    if(!email || !password || email === '' || password === '') {
        next(errorHandler(400 , 'All fiels are required!'))
    }

    try {
        const validUser = await User.findOne({email})

        if(!validUser) {
            return next(errorHandler(404 , 'User not found'))
        }

        const validPassword = bcryptjs.compareSync(password , validUser.password)

        if(!validPassword) {
            return next(errorHandler(400 , 'Invalid password'))
        }

        const token = jwt.sign(
            { id : validPassword._id },
            process.env.JWT_SECERT,
            { expiresIn : '1d' }
        )

        const {password : pass , ...rest} = validUser._doc

        res.status(200).cookie('access_token' , token , {
            httpOnly : true,
        }).json(rest)
    } catch (error) {
        next(error)
    }
}

export const updateUser = async (req , res , next) => {
    const id = req.params.id

    try {
        const updateUser = await User.findByIdAndUpdate(id, {
            $set: req.body
        }, { new: true })

        res.status(200).json({
            success: true,
            message: 'Successfully Updated',
            data: updateUser
        })
    } catch (error) {
        next(error)
    }
}
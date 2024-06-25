import Hotel from "../models/Hotel.model.js"
import {errorHandler} from "../utils/Error.js" 

export const createHotel = async (req , res , next) => {
    const {
        name,
        description,
        address,
        city,
        country,
        pricePerNight,
    } = req.body;

    if (!name || !description || !address || !city || !country || !pricePerNight) {
        return res.status(400).json({
            success : false,
            message : "All fields are required"
        })
    }

    const hotel = new Hotel({
        name,
        description,
        address,
        city,
        country,
        pricePerNight,
        rooms : []
      });

      try {
        await hotel.save()

        res.json({
            message: "Hotel created successfully!",
            data: hotel
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create. Try again'
        })
    }
}
 
export const getAllHotel = async (req , res) => {
    try {
        const hotel = await Hotel.find()

        if(!hotel) {
            return res.status(400).json({
                success : false,
                message : "Hotel not found"
            })
        }

        res.status(200).json({
            message : "Get all the hotel successfully!",
            length : hotel.length,
            data : hotel
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch. Try again'
        })
    }
}

export const getSingleHotel = async (req , res) => {
    const id = req.params.id

    try {
        const getSingleHotel = await Hotel.findById(id)

        res.status(200).json({
            success: true,
            message: 'Successfully get single hotel',
            data: getSingleHotel
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Failed to get single Hotel. Try again'
        })
    }
}

export const updateHotel = async (req , res) => {
    const id = req.params.id

    try {
        const updateHotel = await Hotel.findByIdAndUpdate(id, {
            $set: req.body
        }, { new: true })

        res.status(200).json({
            success: true,
            message: 'Successfully Updated',
            data: updateHotel
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update. Try again'
        })
    }
}

export const deleteHotel = async (req , res) => {
    const id = req.params.id

    try {
        await Hotel.findByIdAndDelete(id)

        res.status(200).json({
            success: true,
            message: 'Successfully deleted'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete. Try again'
        })
    }
}
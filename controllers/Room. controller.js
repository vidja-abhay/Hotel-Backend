import Room from '../models/Room.model.js';
import Hotel from '../models/Hotel.model.js';
import Booking from '../models/Booking.model.js';
import mongoose from 'mongoose';

export const createRoom = async (req, res) => {
    console.log('createRoom function called');
    console.log('Request body:', req.body);

    const { hotelId, roomNumber, type, description, price, capacity } = req.body;

    if (!hotelId || !roomNumber || !type || !description || !price || !capacity) {
        console.log('Missing required fields');
        return res.status(400).json({
            success: false,
            message: 'Please provide all required fields',
        });
    }

    try {
        const hotel = await Hotel.findById(hotelId);
        console.log('Found hotel:', hotel);

        if (!hotel) {
            console.log('Hotel not found');
            return res.status(404).json({
                success: false,
                message: 'Hotel not found',
            });
        }

        const room = new Room({
            hotel: hotelId,
            roomNumber,
            type,
            description,
            price,
            capacity,
            bookings: [],
        });
        console.log('New room object:', room);

        // Save the room
        await room.save();
        console.log('Room saved');

        // Update the hotel
        hotel.rooms.push(room._id);
        await hotel.save();
        console.log('Hotel updated');

        return res.status(201).json({
            success: true,
            message: 'Room created successfully!',
            data: room,
        });
    } catch (error) {
        console.error('Error in createRoom:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to create room. Try again',
            error: error.message,
        });
    }
};

// export const createRoom = async (req, res) => {
//     console.log('createRoom function called');
//     console.log('Request body:', req.body);

//     const { hotelId, roomNumber, type, description, price, capacity } = req.body;

//     if (!hotelId || !roomNumber || !type || !description || !price || !capacity) {
//         console.log('Missing required fields');
//         return res.status(400).json({
//             success: false,
//             message: 'Please provide all required fields',
//         });
//     }

//     try {
//         const hotel = await Hotel.findById(hotelId);
//         console.log('Found hotel:', hotel);

//         if (!hotel) {
//             console.log('Hotel not found');
//             return res.status(404).json({
//                 success: false,
//                 message: 'Hotel not found',
//             });
//         }

//         const room = new Room({
//             hotel: hotelId,
//             roomNumber,
//             type,
//             description,
//             price,
//             capacity,
//             bookings: [],
//         });
//         console.log('New room object:', room);

//         const session = await mongoose.startSession();
//         session.startTransaction();

//         try {
//             await room.save({ session });
//             console.log('Room saved');
//             hotel.rooms.push(room._id);
//             await hotel.save({ session });
//             console.log('Hotel updated');
//             await session.commitTransaction();
//             session.endSession();
//             console.log('Transaction committed');

//             return res.status(201).json({
//                 success: true,
//                 message: 'Room created successfully!',
//                 data: room,
//             });
//         } catch (error) {
//             console.error('Error in transaction:', error);
//             await session.abortTransaction();
//             session.endSession();
//             return res.status(500).json({
//                 success: false,
//                 message: 'Failed to create room. Try again',
//                 error: error.message,
//             });
//         }
//     } catch (error) {
//         console.error('Error in createRoom:', error);
//         return res.status(500).json({
//             success: false,
//             message: 'Failed to create room. Try again',
//             error: error.message,
//         });
//     }
// };


export const updateRoom = async (req , res) => {
    const id = req.params.id

    try {
        const updateRoom = await Room.findByIdAndUpdate(id, {
            $set: req.body
        }, { new: true })

        res.status(200).json({
            success: true,
            message: 'Successfully Updated',
            data: updateRoom
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to update room. Try again',
            error: error.message,
        });
    }
}

export const DeleteRoom = async (req, res) => {
    const id = req.params.id;

    try {
        // Find the room to be deleted
        const roomToDelete = await Room.findById(id);

        // Check if the room was not found
        if (!roomToDelete) {
            return res.status(404).json({
                success: false,
                message: 'Room not found',
            });
        }

        // Find the hotel to which the room belongs
        const hotel = await Hotel.findById(roomToDelete.hotel);

        // Check if the hotel was not found (although this should not happen)
        if (!hotel) {
            return res.status(404).json({
                success: false,
                message: 'Hotel not found',
            });
        }

        // Remove the room from the hotel's rooms array
        hotel.rooms = hotel.rooms.filter(room => room.toString() !== id);

        // Save the changes to the hotel
        await hotel.save();

        // Delete the room
        await Room.findByIdAndDelete(id);

        // Respond with success
        res.status(200).json({
            success: true,
            message: 'Successfully deleted',
            data: roomToDelete,
        });
    } catch (error) {
        // Handle errors
        return res.status(500).json({
            success: false,
            message: 'Failed to delete room. Try again',
            error: error.message,
        });
    }
};

export const getAllRooms = async (req , res) => {
    try {
        const room = await Room.find({})

        if (!room) {
            return res.status(400).json({
                success : false,
                message : "Rooms Not found"
            })
        }

        res.status(200).json({
            message: "Get all the room successfully!",
            length : room.length,
            data: room
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to delete room. Try again',
            error: error.message,
        });
    }
}

export const getSingleRoom = async (req , res) => {
    const id = req.params.id
    try {
        const room = await Room.findById(id)

        if (!room) {
            return res.status(400).json({
                success : false,
                message : "Rooms Not found"
            })
        }

        res.status(200).json({
            message: "Get room successfully!",
            length : room.length,
            data: room
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to delete room. Try again',
            error: error.message,
        });
    }
}

export const getAllRoomByHotel = async (req, res) => {
    const hotelId = req.params.hid;

    try {
        const hotel = await Hotel.findById(hotelId);

        if (!hotel) {
            return res.status(404).json({
                success: false,
                message: 'Hotel not found',
            });
        }

        const rooms = await Room.find({ hotel: hotelId });

        res.status(200).json({
            success: true,
            message: 'Rooms fetched successfully',
            length : rooms.length,
            data: rooms,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch rooms. Try again',
            error: error.message,
        });
    }
};

export const getAllAvailableRooms = async (req, res) => {
    const { checkInDate, checkOutDate } = req.query;

    // Validate input
    if (!checkInDate || !checkOutDate) {
        return res.status(400).json({
            success: false,
            message: 'Please provide both check-in and check-out dates',
        });
    }

    try {
        // Convert date strings to Date objects
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);

        // Validate dates
        if (isNaN(checkIn.getTime()) || isNaN(checkOut.getTime())) {
            return res.status(400).json({
                success: false,
                message: 'Invalid date format. Please use YYYY-MM-DD format.',
            });
        }

        if (checkIn >= checkOut) {
            return res.status(400).json({
                success: false,
                message: 'Check-out date must be after check-in date',
            });
        }

        // Find all bookings that overlap with the given date range
        const bookings = await Booking.find({
            $or: [
                { checkInDate: { $lt: checkOut }, checkOutDate: { $gt: checkIn } },
                { checkInDate: { $gte: checkIn, $lt: checkOut } },
                { checkOutDate: { $gt: checkIn, $lte: checkOut } }
            ],
            status: { $ne: 'cancelled' }
        });

        // Get the room IDs of the booked rooms
        const bookedRoomIds = bookings.map(booking => booking.room.toString());

        // Find all rooms that are not in the bookedRoomIds array
        const availableRooms = await Room.find({ _id: { $nin: bookedRoomIds } })

        res.status(200).json({
            success: true,
            count: availableRooms.length,
            data: availableRooms,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message,
        });
    }
};

export const getAllAvailableRoomsByHotel = async (req, res) => {
    const id = req.params.id;
    const { checkInDate, checkOutDate } = req.query;

    // Validate input
    if (!checkInDate || !checkOutDate) {
        return res.status(400).json({
            success: false,
            message: 'Please provide both check-in and check-out dates',
        });
    }

    try {
        // Check if the hotel exists
        const hotel = await Hotel.findById(id);
        if (!hotel) {
            return res.status(404).json({
                success: false,
                message: 'Hotel not found',
            });
        }

        // Convert date strings to Date objects
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);

        // Validate dates
        if (isNaN(checkIn.getTime()) || isNaN(checkOut.getTime())) {
            return res.status(400).json({
                success: false,
                message: 'Invalid date format. Please use YYYY-MM-DD format.',
            });
        }

        if (checkIn >= checkOut) {
            return res.status(400).json({
                success: false,
                message: 'Check-out date must be after check-in date',
            });
        }

        // Find all bookings for the hotel that overlap with the given date range
        const bookings = await Booking.find({
            hotel: id,
            $or: [
                { checkInDate: { $lt: checkOut }, checkOutDate: { $gt: checkIn } },
                { checkInDate: { $gte: checkIn, $lt: checkOut } },
                { checkOutDate: { $gt: checkIn, $lte: checkOut } }
            ],
            bookingStatus: { $ne: 'cancelled' }
        });

        // Get the room IDs of the booked rooms
        const bookedRoomIds = bookings.map(booking => booking.room.toString());

        // Find all rooms in the hotel that are not in the bookedRoomIds array
        const availableRooms = await Room.find({
            _id: { $nin: bookedRoomIds },
            hotel: id
        })

        res.status(200).json({
            success: true,
            count: availableRooms.length,
            data: availableRooms,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message,
        });
    }
};
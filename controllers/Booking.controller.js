import User from "../models/User.model.js";
import Hotel from "../models/Hotel.model.js";
import Room from "../models/Room.model.js";
import Booking from "../models/Booking.model.js";
import mongoose from 'mongoose';

// export const createBooking = async (req, res) => {
//     const { guestId, roomId, hotelId, checkInDate, checkOutDate, totalPrice, specialRequests } = req.body;

//     if (!guestId || !roomId || !checkInDate || !checkOutDate || !totalPrice) {
//         return res.status(400).json({
//             success: false,
//             message: 'Please provide all required fields',
//         });
//     }

//     const session = await mongoose.startSession();
//     session.startTransaction();

//     try {
//         const room = await Room.findById(roomId).session(session);
//         const user = await User.findById(guestId).session(session);

//         if (!room) {
//             await session.abortTransaction();
//             session.endSession();
//             return res.status(404).json({
//                 success: false,
//                 message: 'Room not found',
//             });
//         }

//         if (!user) {
//             await session.abortTransaction();
//             session.endSession();
//             return res.status(404).json({
//                 success: false,
//                 message: 'User not found',
//             });
//         }

//         console.log(`Checking for conflicting bookings for room ${roomId} between ${checkInDate} and ${checkOutDate}`);

//         const conflictingBooking = await Booking.findOne({
//             room : roomId,
//             $or: [
//               { checkInDate: { $lt: checkOutDate }, checkOutDate: { $gt: checkInDate } },
//               { checkInDate: { $gte: checkInDate, $lt: checkOutDate } },
//               { checkOutDate: { $gt: checkInDate, $lte: checkOutDate } }
//             ],
//             bookingStatus: { $ne: 'cancelled' }
//           }).session(session);

//           console.log('Conflicting booking:', conflictingBooking);
      
//           if (conflictingBooking) {
//             await session.abortTransaction();
//             session.endSession();
//             return res.status(404).json({
//                 success: false,
//                 message: 'Room is not available for the selected dates',
//             });
//           }

//         const booking = new Booking({
//             guest: guestId,
//             room: roomId,
//             hotel: hotelId,
//             checkInDate: new Date(checkInDate),
//             checkOutDate: new Date(checkOutDate),
//             totalPrice,
//             specialRequests,
//             status: 'confirmed',
//         });

//         await booking.save({ session });

//         room.bookings.push(booking._id);
//         room.isBooked = true;
//         await room.save({ session });

//         user.bookings.push(booking._id);
//         await user.save({ session });

//         await session.commitTransaction();
//         session.endSession();

//         res.status(201).json({
//             success: true,
//             message: 'Booking created successfully!',
//             data: booking,
//         });
//     } catch (error) {
//         await session.abortTransaction();
//         session.endSession();
//         return res.status(500).json({
//             success: false,
//             message: 'Failed to create booking. Try again',
//             error: error.message
//         })
//     }
// }

export const createBooking = async (req, res) => {
    const { guestId, roomId, hotelId, checkInDate, checkOutDate, totalPrice, specialRequests } = req.body;

    if (!guestId || !roomId || !checkInDate || !checkOutDate || !totalPrice) {
        return res.status(400).json({
            success: false,
            message: 'Please provide all required fields',
        });
    }

    try {
        const room = await Room.findById(roomId);
        const user = await User.findById(guestId);

        if (!room) {
            return res.status(404).json({
                success: false,
                message: 'Room not found',
            });
        }

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        console.log(`Checking for conflicting bookings for room ${roomId} between ${checkInDate} and ${checkOutDate}`);

        const conflictingBooking = await Booking.findOne({
            room: roomId,
            $or: [
                { checkInDate: { $lt: checkOutDate }, checkOutDate: { $gt: checkInDate } },
                { checkInDate: { $gte: checkInDate, $lt: checkOutDate } },
                { checkOutDate: { $gt: checkInDate, $lte: checkOutDate } }
            ],
            bookingStatus: { $ne: 'cancelled' }
        });

        console.log('Conflicting booking:', conflictingBooking);
    
        if (conflictingBooking) {
            return res.status(400).json({
                success: false,
                message: 'Room is not available for the selected dates',
            });
        }

        const booking = new Booking({
            guest: guestId,
            room: roomId,
            hotel: hotelId,
            checkInDate: new Date(checkInDate),
            checkOutDate: new Date(checkOutDate),
            totalPrice,
            specialRequests,
            status: 'confirmed',
        });

        await booking.save();

        room.bookings.push(booking._id);
        room.isBooked = true;
        await room.save();

        user.bookings.push(booking._id);
        await user.save();

        res.status(201).json({
            success: true,
            message: 'Booking created successfully!',
            data: booking,
        });
    } catch (error) {
        console.error('Error in createBooking:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to create booking. Try again',
            error: error.message
        });
    }
}

// export const updateBooking = async (req, res) => {
//     const session = await mongoose.startSession();
//     session.startTransaction();
//     const bookingId = req.params.id

//     try {
//         const currentBooking = await Booking.findById(bookingId).session(session);

//         const updateData = req.body

//         if (!currentBooking) {
//             return res.status(404).json({
//                 success: true,
//                 message: 'Booking not found',
//             });
//         }

//         if (currentBooking.bookingStatus === 'cancelled') {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Booking cannot be updated',
//             });
//         }

//         if (updateData.room && updateData.room !== currentBooking.room.toString()) {

//             await Room.findByIdAndUpdate(
//                 currentBooking.room,
//                 { $pull: { bookings: bookingId },isBooked : false },
//                 { session }
//             );

        
//             await Room.findByIdAndUpdate(
//                 updateData.room,
//                 { $push: { bookings: bookingId } , isBooked : true },
//                 { session }
//             );
//         }

//         if (updateData.guest && updateData.guest !== currentBooking.guest.toString()) {
//             await User.findByIdAndUpdate(
//                 currentBooking.guest,
//                 { $pull: { bookings: bookingId } },
//                 { session }
//             );

//             await User.findByIdAndUpdate(
//                 updateData.guest,
//                 { $push: { bookings: bookingId } },
//                 { session }
//             );
//         }

//         const updatedBooking = await Booking.findByIdAndUpdate(
//             bookingId,
//             updateData,
//             { new: true, runValidators: true, session }
//         );

//         if (!updatedBooking) {
//             res.status(404).json({
//                 success: true,
//                 message: 'Booking not found'
//             });
//         }

       
//         await session.commitTransaction();
//         session.endSession();

//         res.status(201).json({
//             success: true,
//             message: 'Booking updated successfully!',
//             data: updatedBooking,
//         });
//     } catch (error) {
       
//         if (session.inTransaction()) {
//             await session.abortTransaction();
//         }
//         session.endSession();
//         throw error;
//     }
// }

// export const deleteBooking = async (req, res) => {
//     const session = await mongoose.startSession();
//     session.startTransaction();
//     const bookingId = req.params.id;

//     try {
       
//         const booking = await Booking.findById(bookingId).session(session);

//         if (!booking) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Booking not found',
//             });
//         }

//         if (booking.bookingStatus === 'cancelled') {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Booking cannot be deleted',
//             });
//         }

//         const updatedRoom = await Room.findByIdAndUpdate(
//             booking.room,
//             { $pull: { bookings: bookingId }, isBooked: false },
//             { new: true, session }
//         );

//         if (!updatedRoom) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Room not found',
//             });
//         }

//         const updatedUser = await User.findByIdAndUpdate(
//             booking.guest,
//             { $pull: { bookings: bookingId } },
//             { new: true, session }
//         );

//         if (!updatedUser) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'User not found',
//             });
//         }

//         await Booking.findByIdAndDelete(bookingId).session(session);

//         await session.commitTransaction();

//         res.status(200).json({
//             success: true,
//             message: 'Booking deleted successfully!',
//         });
//     } catch (error) {
        
//         if (session.inTransaction()) {
//             await session.abortTransaction();
//         }

//         throw error;
//     } finally {
//         session.endSession();
//     }
// }

export const updateBooking = async (req, res) => {
    const bookingId = req.params.id;

    try {
        const currentBooking = await Booking.findById(bookingId);
        const updateData = req.body;

        if (!currentBooking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found',
            });
        }

        if (currentBooking.bookingStatus === 'cancelled') {
            return res.status(400).json({
                success: false,
                message: 'Booking cannot be updated',
            });
        }

        if (updateData.room && updateData.room !== currentBooking.room.toString()) {
            await Room.findByIdAndUpdate(
                currentBooking.room,
                { $pull: { bookings: bookingId }, isBooked: false }
            );

            await Room.findByIdAndUpdate(
                updateData.room,
                { $push: { bookings: bookingId }, isBooked: true }
            );
        }

        if (updateData.guest && updateData.guest !== currentBooking.guest.toString()) {
            await User.findByIdAndUpdate(
                currentBooking.guest,
                { $pull: { bookings: bookingId } }
            );

            await User.findByIdAndUpdate(
                updateData.guest,
                { $push: { bookings: bookingId } }
            );
        }

        const updatedBooking = await Booking.findByIdAndUpdate(
            bookingId,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedBooking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Booking updated successfully!',
            data: updatedBooking,
        });
    } catch (error) {
        console.error('Error in updateBooking:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update booking. Try again',
            error: error.message
        });
    }
};

export const deleteBooking = async (req, res) => {
    const bookingId = req.params.id;

    try {
        const booking = await Booking.findById(bookingId);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found',
            });
        }

        if (booking.bookingStatus === 'cancelled') {
            return res.status(400).json({
                success: false,
                message: 'Booking cannot be deleted',
            });
        }

        const updatedRoom = await Room.findByIdAndUpdate(
            booking.room,
            { $pull: { bookings: bookingId }, isBooked: false },
            { new: true }
        );

        if (!updatedRoom) {
            return res.status(404).json({
                success: false,
                message: 'Room not found',
            });
        }

        const updatedUser = await User.findByIdAndUpdate(
            booking.guest,
            { $pull: { bookings: bookingId } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        await Booking.findByIdAndDelete(bookingId);

        res.status(200).json({
            success: true,
            message: 'Booking deleted successfully!',
        });
    } catch (error) {
        console.error('Error in deleteBooking:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete booking. Try again',
            error: error.message
        });
    }
}

export const getAllBooking = async (req, res) => {
    try {
        const booking = await Booking.find()

        if (!booking) {
            return res.status(400).json({
                success : false,
                message : "Bookings Not found"
            })
        }

        res.status(200).json({
            message: "Get all the room successfully!",
            length : booking.length,
            data: booking
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to delete room. Try again',
            error: error.message,
        });
    }
}

export const getSingleBooking = async (req, res) => {
    const id = req.params.id
    try {
        const booking = await Booking.findById(id)

        if (!booking) {
            return res.status(400).json({
                success : false,
                message : "booking Not found"
            })
        }

        res.status(200).json({
            message: "Get booking successfully!",
            length : booking.length,
            data: booking
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to delete room. Try again',
            error: error.message,
        });
    }
}

export const getAllBookingByHotel = async (req, res) => {

}

export const getAllBookingsByRoom = async (req, res) => {
    const id = req.params.id

    try {
        const room = await Room.findById(id);

        if (!room) {
            return res.status(404).json({
                success: false,
                message: 'Room not found',
            });
        }

        const bookings = await Booking.find({ room: id })
            .sort({ checkInDate: 1 }); // Sort by check-in date in ascending order

        res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message,
        });
    }
};

export const getAllBookingByUser = async (req, res) => {
    const id = req.params.id

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        const bookings = await Booking.find({ guest : id })
            .sort({ checkInDate: 1 }); // Sort by check-in date in ascending order

        res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message,
        });
    }
}
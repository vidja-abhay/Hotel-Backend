import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
    {
        guest: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        room: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Room',
        },
        hotel: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Hotel',
            required: true
        },
        checkInDate: {
            type: Date,
            required: true,
        },
        checkOutDate: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            enum: ['pending', 'confirmed', 'cancelled'],
            default: 'pending',
        },
        totalPrice: {
            type: Number,
            required: true,
        },
        paymentStatus: {
            type: String,
            enum: ['pending', 'paid', 'failed'],
            default: 'pending',
        },
        specialRequests: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;

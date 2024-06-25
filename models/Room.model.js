import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
    {
        hotel: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Hotel',
          },
        roomNumber: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        capacity: {
            type: Number,
            required: true,
        },
        images: {
            type: String,
            default: "https://tse4.mm.bing.net/th?id=OIP.nTK-yAWL01laY6CKjMEq3gHaHa&pid=Api&P=0&h=180"
        },
        bookings: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Booking',
            },
        ],
        isBooked : {
            type : Boolean,
            required : true,
            default : false
        }
    },
    {
        timestamps: true,
    }
);

const Room = mongoose.model('Room', roomSchema);

export default Room
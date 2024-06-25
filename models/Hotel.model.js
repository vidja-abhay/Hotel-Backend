import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            default: 0,
        },
        numReviews: {
            type: Number,
            required: true,
            default: 0,
        },
        pricePerNight: {
            type: Number,
            required: true,
        },
        images:
        {
            type: String,
            default: "https://tse4.mm.bing.net/th?id=OIP.nTK-yAWL01laY6CKjMEq3gHaHa&pid=Api&P=0&h=180"
        },
        rooms: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Room',
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Hotel = mongoose.model('Hotel', hotelSchema);

export default Hotel
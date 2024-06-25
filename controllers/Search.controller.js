import Room from "../models/Room.model.js";
import Hotel from "../models/Hotel.model.js";

export const search = async (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({
            success: false,
            message: 'Please provide a search query',
        });
    }

    try {
        // Search hotels
        const hotelSearchCriteria = {
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { address: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
            ],
        };

        const hotels = await Hotel.find(hotelSearchCriteria);

        // Search rooms
        const roomSearchCriteria = {
            $or: [
                { roomNumber: { $regex: query, $options: 'i' } },
                { type: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
            ],
        };

        const rooms = await Room.find(roomSearchCriteria).populate('hotel', 'name address');

        res.status(200).json({
            success: true,
            message: 'Search results fetched successfully',
            data: {
                hotels,
                rooms,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch search results. Try again',
            error: error.message,
        });
    }
};

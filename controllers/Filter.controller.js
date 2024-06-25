import Room from "../models/Room.model.js";
import mongoose from "mongoose";

export const getAllRoomsSortedByPriceHighestToLowest = async (req, res) => {
  try {
      // Fetch all rooms and sort by price in descending order
      const rooms = await Room.find()
          .sort({ price: -1 }) // -1 for descending order
          .exec();

      // Check if any rooms were found
      if (rooms.length === 0) {
          return res.status(404).json({
              success: false,
              message: 'No rooms found',
          });
      }

      // Return the sorted rooms
      res.status(200).json({
          success: true,
          count: rooms.length,
          data: rooms,
      });

  } catch (error) {
      res.status(500).json({
          success: false,
          message: 'Server Error',
          error: error.message,
      });
  }
};

export const getAllRoomsSortedByPriceLowestToHighest = async (req, res) => {
  try {
      // Fetch all rooms and sort by price in ascending order
      const rooms = await Room.find()
          .sort({ price: 1 }) // 1 for ascending order
          .exec();

      // Check if any rooms were found
      if (rooms.length === 0) {
          return res.status(404).json({
              success: false,
              message: 'No rooms found',
          });
      }

      // Return the sorted rooms
      res.status(200).json({
          success: true,
          count: rooms.length,
          data: rooms,
      });

  } catch (error) {
      res.status(500).json({
          success: false,
          message: 'Server Error',
          error: error.message,
      });
  }
};

export const getRoomsByPriceRange = async (req, res) => {
  try {
      // Extract minPrice and maxPrice from query parameters
      let { minPrice, maxPrice } = req.query;

      // Convert to numbers and set defaults if not provided
      minPrice = minPrice ? Number(minPrice) : 0;
      maxPrice = maxPrice ? Number(maxPrice) : Infinity;

      // Validate the price range
      if (isNaN(minPrice) || isNaN(maxPrice) || minPrice < 0 || maxPrice < minPrice) {
          return res.status(400).json({
              success: false,
              message: 'Invalid price range. Please provide valid minPrice and maxPrice values.',
          });
      }

      // Fetch rooms within the price range
      const rooms = await Room.find({
          price: { $gte: minPrice, $lte: maxPrice }
      }).sort({ price: 1 }); // Sort by price ascending

      // Check if any rooms were found
      if (rooms.length === 0) {
          return res.status(404).json({
              success: false,
              message: 'No rooms found within the specified price range',
          });
      }

      // Return the filtered rooms
      res.status(200).json({
          success: true,
          count: rooms.length,
          data: rooms,
      });

  } catch (error) {
      res.status(500).json({
          success: false,
          message: 'Server Error',
          error: error.message,
      });
  }
};
# Hotel Management System (Backend)

This is the backend for a Hotel Management System, providing APIs for hotel and room management, bookings, and user interactions. The system allows users to view available hotels, rooms, make bookings, and manage their reservations.

## Features

- List all available hotels
- View rooms for each hotel
- Book available rooms for specific time periods
- Cancel bookings
- Automatic update of user, room, and booking models on reservation changes
- Time-based room availability check

## Technologies Used

- Node.js
- Express.js
- MongoDB
- JSON Web Tokens (JWT) for authentication
- Other npm packages:
  - dotenv (for environment variables)
  - bcryptjs (for hashed a password)
  - mongoose (for create a database schema)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed
- MongoDB installed and running
- VS Code or another IDE of your choice
- MongoDB Compass (for database management)

## Setup and Installation

1. Clone the repository : https://github.com/vidja-abhay/Hotel-Backend.git

2. Navigate to the project directory : 
```bash
cd hotel
```

3. Install dependencies : 
```bash 
npm i bcryptjs cors dotenv express jsonwebtoken mongoose
```

4. Create a `.env` file in the root directory and add your environment variables.

5. Start the server : 
```bash
npm Start
```

## Database Models

### User Model
- Fields: username, email, password, bookings, profilePicture, role

### Hotel Model
- Fields: name, description, address, city, country, rating, numReviews, pricePerNight, images, rooms

### Room Model
- Fields: hotel, roomNumber, type, description, price, capacity, images, bookings, isBooked

### Booking Model
- Fields: guest, room, hotel, checkInDate, checkOutDate, status, totalPrice, paymentStatus, specialRequests

## Authentication

This API uses JWT for authentication. Include the token in the Authorization header for protected routes.

## Error Handling

The API returns appropriate HTTP status codes and error messages for different scenarios.

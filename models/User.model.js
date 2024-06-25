import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
    },

    email : {
        type : String,
        required : true,
        unique : true,
    },

    password : {
        type : String,
        required : true,
        minLength : 8
    },

    profilePicture : {
        type : String,
        default : "https://tse4.mm.bing.net/th?id=OIP.nTK-yAWL01laY6CKjMEq3gHaHa&pid=Api&P=0&h=180"
    },

    role: {
        type: String,
        default: "user"
    },


    bookings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Booking',
        },
    ],
},
    {timestamps : true},
);

const User = mongoose.model('User' , userSchema);

export default User
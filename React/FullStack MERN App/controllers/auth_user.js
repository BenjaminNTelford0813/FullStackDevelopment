/* THIS CODE MANAGE THE AUTHENTICATION AND REGISTRATION BY THE USER*/


import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/user_models.js";

/* User Registration */
export const register = async (req, rel) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
        } = req.body;
    
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash (password, salt);
    const newUser = new user ({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor (Math.random() * 10000),  //Generate random numbers of visualizations
            impressions: Math.floor (Math.random() * 10000),    //Generate random numbers of impressions
    });
   
    const savedUser = await newUser.save();
    res.status (201).json (savedUser);
    
    } catch (err) {
        res.status (500).json ({ error: err.message});
    }
};

// Logging In verification //
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne ({ email: email });
            if (!user) return res.status (400).json ({msg: "User does not exist."});
        
        // bcrypt will compare the user password in the login attempt to the password saved in the database
        const isMatch = await bcrypt.compare (password, user.password); 
            if (!isMatch) return res.status (400).json ({msg: "Ivalid credentials"});
        
        const token = jwt.sign ({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;
        res.satus (200).json ({token, user});

    } catch (err) {
        res.status (500).json ({ error: err.message});
    }
 
}
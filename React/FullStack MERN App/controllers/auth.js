import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import user from "../models/user.js";

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
            viewedProfile: Math.floor (Math.random() * 10000),
            impressions: Math.floor (Math.random() * 10000),
    });
   
    const savedUser = await newUser.save();
    res.status (201).json (savedUser);
    
    } catch (err) {
        res.status (500).json ({ error: err.message});
    }
};
import express from "express";
import { get } from "mongoose";
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
    
} from "../controllers/auth_user.js";

import { verifyToken } from "../middleware/auth_middleware.js";

const routerUserReadUpdate = express.Router();

// READ //
routerUserReadUpdate.get("/:id", verifyToken, getUser);
routerUserReadUpdate.get("/:id/Friends", verifyToken, getUserFriends);

// UPDATE //
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default routerUserReadUpdate;
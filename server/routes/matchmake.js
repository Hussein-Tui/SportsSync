import express from "express";
import { getAllUser } from "../controllers/matchmakeController.js";

import { verifyToken } from "../middleware/auth.js";


// const {
//     getAllUser
// } = require('../controllers/matchmakeController');
const router = express.Router();

// get all users
router.get('/',verifyToken, getAllUser);

export default router;

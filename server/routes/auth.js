import express from "express";
import { login } from "../controllers/auth.js";

const router = express.Router();

// this will actually be auth/login due to imports
router.post("/login", login);

export default router;

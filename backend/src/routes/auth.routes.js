import express from "express";
const authRouter = express.Router();

import { registerUser, loginUser } from "../controllers/auth.controller.js";
import { IdentiyUser } from "../middleware/auth.middleware.js";

// registration api
// API is /api/auth/register
authRouter.post("/register", registerUser);

// login api
// API is /api/auth/login
authRouter.post("/login", loginUser);

export default authRouter;
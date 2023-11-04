import express from "express";
const router = express.Router();

import { UserRegister } from "../controllers/UserController.js";

router.post("/users", UserRegister);

export default router;
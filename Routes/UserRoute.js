import express from "express";
const router = express.Router();

import { UserRegister, UserLogin } from "../controllers/UserController.js";

router.post("/users", UserRegister);
router.post("/users/login", UserLogin);

export default router;
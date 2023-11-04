import express from "express";
const router = express.Router();

import { UserRegister, UserLogin, getUsers } from "../controllers/UserController.js";

router.post("/users", UserRegister);
router.post("/users/login", UserLogin);

router.get("/users", getUsers);

export default router;
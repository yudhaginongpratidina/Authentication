import express from "express";
const router = express.Router();

import { UserRegister, UserLogin, getUsers, getUsersById, getUsersByRole } from "../controllers/UserController.js";

router.post("/users", UserRegister);
router.post("/users/login", UserLogin);

router.get("/users", getUsers);
router.get("/users/:id", getUsersById);
router.get("/users/role/:role", getUsersByRole);


export default router;
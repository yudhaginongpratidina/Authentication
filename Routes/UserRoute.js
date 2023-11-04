import express from "express";
const router = express.Router();

import { UserRegister, UserLogin, getUsers, getUsersById, getUsersByRole, userUpdate, updateRoleUsers } from "../controllers/UserController.js";

router.post("/users", UserRegister);
router.post("/users/login", UserLogin);

router.get("/users", getUsers);
router.get("/users/:id", getUsersById);
router.get("/users/role/:role", getUsersByRole);

router.patch("/users/:id", userUpdate);
router.patch("/users/role/:id", updateRoleUsers);



export default router;
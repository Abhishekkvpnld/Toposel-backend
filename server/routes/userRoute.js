import express from "express";
import { jwtAuth } from "../middleware/jwtAuth.js";
import { fetchUserData, login, logout, register, search } from "../controller/userController.js";

const router = express.Router();

router.post("/register",register);
router.post("/login", login);
router.get("/user", jwtAuth, fetchUserData);
router.get("/logout",jwtAuth, logout);
router.get("/search",jwtAuth,search)

export default router;
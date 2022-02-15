import express from "express";
import {register,login,updateUser} from "../controllers/authController.js";

const router = express.Router();

router.route("/register", register);
router.route("/login", login);
router.route("/updateUser", updateUser);

export default router;

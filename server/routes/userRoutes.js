import express from "express";
import { getUserProfileCtrl, loginUserCtrl, registerUserCtrl, updateShippingAddressCtrl } from "../controllers/UserController.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const userRoutes = express.Router();

userRoutes.post("/register", registerUserCtrl);
userRoutes.post("/login", loginUserCtrl);
userRoutes.post("/profile", isLoggedIn, getUserProfileCtrl);
userRoutes.post("/update/shipping", isLoggedIn, updateShippingAddressCtrl);

export default userRoutes;
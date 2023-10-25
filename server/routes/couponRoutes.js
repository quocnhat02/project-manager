import express from "express";
import { createCouponCtrl, deleteCouponCtrl, getAllCouponsCtrl, getCouponCtrl, updateCouponCtrl } from "../controllers/CouponController.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import isAdmin from "../middlewares/isAdmin.js";

const couponRoutes = express.Router();

couponRoutes.post("/", isLoggedIn, isAdmin, createCouponCtrl);
couponRoutes.get("/", getAllCouponsCtrl);
couponRoutes.put("/update/:id", isLoggedIn, isAdmin, updateCouponCtrl);
couponRoutes.delete("/delete/:id", isLoggedIn, isAdmin, deleteCouponCtrl);
couponRoutes.get("/:id", getCouponCtrl);

export default couponRoutes;
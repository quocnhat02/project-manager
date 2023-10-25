import express from "express";
import { createOrderCtrl, getAllOrdersCtrl, getSalesSumCtrl, getSingleOrderCtrl, updateOrderCtrl } from "../controllers/OrderController.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const orderRoutes = express.Router();

orderRoutes.post("/", isLoggedIn, createOrderCtrl);
orderRoutes.get("/", isLoggedIn, getAllOrdersCtrl);
orderRoutes.put("/update/:id", isLoggedIn, updateOrderCtrl);
orderRoutes.get("/", isLoggedIn, getSingleOrderCtrl);
orderRoutes.get("/sales/sum", isLoggedIn, getSalesSumCtrl);

export default orderRoutes;
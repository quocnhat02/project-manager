import express from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { createReviewCtrl } from "../controllers/ReviewController.js";

const reviewRoutes = express.Router();

reviewRoutes.post("/:productId", isLoggedIn, createReviewCtrl);

export default reviewRoutes;
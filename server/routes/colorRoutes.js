import express from "express";
import { createColorCtrl, deleteColorCtrl, getAllColorsCtrl, getSingleColorCtrl, updateColorCtrl } from "../controllers/ColorController.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import isAdmin from "../middlewares/isAdmin.js";

const colorsRoutes = express.Router();

colorsRoutes.post("/", isLoggedIn, isAdmin, createColorCtrl);
colorsRoutes.get("/", getAllColorsCtrl);
colorsRoutes.get("/:id", getSingleColorCtrl);
colorsRoutes.delete("/:id", isLoggedIn, isAdmin, deleteColorCtrl);
colorsRoutes.put("/:id", isLoggedIn, isAdmin, updateColorCtrl);

export default colorsRoutes;
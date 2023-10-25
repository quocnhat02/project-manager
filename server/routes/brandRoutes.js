import express from "express";
import { createBrandCtrl, deleteBrandCtrl, getAllBrandsCtrl, getSingleBrandCtrl, updateBrandCtrl } from "../controllers/BrandController.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import isAdmin from "../middlewares/isAdmin.js";

const brandsRoutes = express.Router();

brandsRoutes.post("/", isLoggedIn, isAdmin, createBrandCtrl);
brandsRoutes.get("/", getAllBrandsCtrl);
brandsRoutes.get("/:id", getSingleBrandCtrl);
brandsRoutes.delete("/:id", isLoggedIn, isAdmin, deleteBrandCtrl);
brandsRoutes.put("/:id", isLoggedIn, isAdmin, updateBrandCtrl);

export default brandsRoutes;
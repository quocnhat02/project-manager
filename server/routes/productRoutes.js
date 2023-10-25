import express from "express";
import { createProductCtrl, getProductsCtrl, getProductCtrl, updateProductCtrl, deleteProdductCtrl } from "../controllers/ProductController.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import upload from "../config/fileUpload.js";
import isAdmin from "../middlewares/isAdmin.js";

const productRoutes = express.Router();

productRoutes.post("/", isLoggedIn, isAdmin, upload.array('file'), createProductCtrl);
productRoutes.get("/", getProductsCtrl);
productRoutes.get("/:id", getProductCtrl);
productRoutes.put("/:id", isLoggedIn, isAdmin, updateProductCtrl);
productRoutes.delete("/:id/delete", isLoggedIn, isAdmin, deleteProdductCtrl);

export default productRoutes;
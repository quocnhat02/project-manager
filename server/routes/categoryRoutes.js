import express from "express";
import { createCategoryCtrl, getAllCategoriesCtrl, updateCategoryCtrl, getSingleCategoryCtrl, deleteCategoryCtrl } from "../controllers/CategoryController.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import categoryFileUpload from "../config/categoryUpload.js";

const categoryRoutes = express.Router();

categoryRoutes.post("/", isLoggedIn,categoryFileUpload.single('file'), createCategoryCtrl);
categoryRoutes.get("/", getAllCategoriesCtrl);
categoryRoutes.get("/:id", getSingleCategoryCtrl);
categoryRoutes.delete("/:id", deleteCategoryCtrl);
categoryRoutes.put("/:id", updateCategoryCtrl);

export default categoryRoutes;
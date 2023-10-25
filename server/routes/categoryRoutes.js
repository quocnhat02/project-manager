import express from "express";
import { createCategoryCtrl, getAllCategoriesCtrl, updateCategoryCtrl, getSingleCategoryCtrl, deleteCategoryCtrl } from "../controllers/CategoryController.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import categoryFileUpload from "../config/categoryUpload.js";

const categoriesRouter = express.Router();

categoriesRouter.post("/", isLoggedIn,categoryFileUpload.single('file'), createCategoryCtrl);
categoriesRouter.get("/", getAllCategoriesCtrl);
categoriesRouter.get("/:id", getSingleCategoryCtrl);
categoriesRouter.delete("/:id", deleteCategoryCtrl);
categoriesRouter.put("/:id", updateCategoryCtrl);

export default categoriesRouter;
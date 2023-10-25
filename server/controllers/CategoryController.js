import asyncHandler from "express-async-handler";
import Category from "../model/Category.js";

export const createCategoryCtrl = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const categoryFound = await Category.findOne({name});
    if(categoryFound){
        throw new Error("Loại sản phẩm này đã tồn tại");
    }

    const category = await Category.create({
        name: name.toLowerCase(),
        user: req.userAuthId,
        image: req.file.path,
    });

    res.json({
        status: "success",
        message: "Thêm loại sản phẩm mới thành công",
        category,
    });
});

export const getAllCategoriesCtrl = asyncHandler(async (req, res) => {
    const categories = await Category.find();
    res.json({
        status: "success",
        message: "Lấy tất cả loại sản phẩm thành công",
        categories,
    });
});

export const getSingleCategoryCtrl = asyncHandler(async (req, res) => {
    const categories = await Category.findById(req.params.id);
    res.json({
        status: "success",
        message: "Lấy sản phẩm thành công",
        categories,
    });
});

export const updateCategoryCtrl = asyncHandler(async (req, res) => {
    const { name } = req.body;

    const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
            name,
        },
        {
            new: true,
        }
    );
    res.json({
        status: "success",
        message: "Cập nhật loại sản phẩm thành công",
        category,
    })
});

export const deleteCategoryCtrl = asyncHandler(async (req, res) => {
    await Category.findByIdAndDelete(req.params.id);
    res.json({
        status: "success",
        message: "Xóa loại sản phẩm thành công",
    });
});
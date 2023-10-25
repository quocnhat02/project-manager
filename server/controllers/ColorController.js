import asyncHandler from "express-async-handler";
import Color from "../model/Color.js";

export const createColorCtrl = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const colorFound = await Color.findOne({name});
    if(colorFound){
        throw new Error("Màu này đã tồn tại");
    }
    const color = await Color.create({
        name: name.toLowerCase(),
        user: req.userAuthId,
    });

    res.json({
        status: "success",
        message: "Thêm màu mới thành công",
    });
});

export const getAllColorsCtrl = asyncHandler(async (req, res) => {
    const colors = await Color.find();
    res.json({
        status: "success",
        message: "Lấy thông tin tất cả màu thành công",
        colors,
    });
});

export const getSingleColorCtrl = asyncHandler(async (req, res) => {
    const color = await Color.findById(req.params.id);
    res.json({
        status: "success",
        message: "Lấy thông tin màu thành công",
        color,
    });
});

export const updateColorCtrl = asyncHandler(async (req, res) => {
    const { name } = req.body;

    const color = await Color.findByIdAndUpdate(
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
        message: "Cập nhật màu thành công",
        brand,
    })
});

export const deleteColorCtrl = asyncHandler(async (req, res) => {
    await Color.findByIdAndDelete(req.params.id);
    res.json({
        status: "success",
        message: "Xóa màu thành công",
    });
});
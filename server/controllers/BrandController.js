import asyncHandler from "express-async-handler";
import Brand from "../model/Brand.js";

export const createBrandCtrl = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const brandFound = await Brand.findOne({name});
    if(brandFound){
        throw new Error("Hãng này đã tồn tại");
    }
    const brand = await Brand.create({
        name: name.toLowerCase(),
        user: req.userAuthId,
    });

    res.json({
        status: "success",
        message: "Thêm hãng mới thành công",
    });
});

export const getAllBrandsCtrl = asyncHandler(async (req, res) => {
    const brands = await Brand.find();
    res.json({
        status: "success",
        message: "Lấy thông tin tất cả hãng thành công",
        brands,
    });
});

export const getSingleBrandCtrl = asyncHandler(async (req, res) => {
    const brands = await Brand.findById(req.params.id);
    res.json({
        status: "success",
        message: "Lấy thông tin hãng thành công",
        brands,
    });
});

export const updateBrandCtrl = asyncHandler(async (req, res) => {
    const { name } = req.body;

    const brand = await Brand.findByIdAndUpdate(
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
        message: "Cập nhật hãng thành công",
        brand,
    })
});

export const deleteBrandCtrl = asyncHandler(async (req, res) => {
    await Brand.findByIdAndDelete(req.params.id);
    res.json({
        status: "success",
        message: "Xóa loại sản phẩm thành công",
    });
});
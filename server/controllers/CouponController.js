import asyncHandler from "express-async-handler";
import Coupon from "../model/Coupon.js";

export const createCouponCtrl = asyncHandler(async (req, res) => {
    const { code, startDate, endDate, discount } = req.body;

    const couponExists = await Coupon.findOne({
        code,
    });

    if(couponExists){
        throw new Error("Phiếu mua hàng này đã tồn tại");
    }

    if(isNaN(discount)){
        throw new Error("Giá trị giảm phải là một số");
    }

    const coupon = await Coupon.create({
        code: code?.toUpperCase(),
        startDate,
        endDate,
        discount,
        user: req.userAuthId,
    });
    res.status(201).json({
        status: "success",
        message: "Tạo phiếu mua hàng thành công",
        coupon,
    });
});

export const getAllCouponsCtrl = asyncHandler(async (req, res) => {
    const coupons = await Coupon.find();
    res.status(200).json({
        status: "success",
        message: "Tất cả phiếu mua hàng",
        coupons,
    });
});

export const getCouponCtrl = asyncHandler(async (req, res) => {
    const coupon = await Coupon.findById(req.params.id);
    res.json({
        status: "success",
        message: "Lấy thông tin phiếu mua hàng thành công",
        coupon,
    });
});

export const updateCouponCtrl = asyncHandler(async (req, res) => {
    const { code, startDate, endDate, discount } = req.body;
    const coupon = await Coupon.findByIdAndUpdate(req.params.id, {
        code: code?.toUpperCase(),
        discount,
        startDate,
        endDate,
    },{
        new: true,
    });
    res.json({
        status: "success",
        message: "Cập nhật phiếu mua hàng thành công",
        coupon,
    })
});

export const deleteCouponCtrl = asyncHandler(async (req, res) => {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);

    res.json({
        status: "success",
        message: "Xóa phiếu mua hàng thành công",
        coupon,
    })
});
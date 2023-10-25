import asyncHandler from "express-async-handler";
import Order from "../model/Order.js";
import User from "../model/User.js";
import Product from "../model/Product.js";
import Coupon from "../model/Coupon.js";

export const createOrderCtrl = asyncHandler(async (req, res) => {
    const { coupon } = req.query;
    
    const couponFound = await Coupon.findOne({
        code: coupon?.toUpperCase(),
    });
    if(couponFound?.isExpired){
        throw new Error("Phiếu mua hàng đã hết hạn");
    }
    if(!couponFound){
        throw new Error("Không tìm thấy phiếu mua hàng");
    }

    const discount = couponFound?.discount / 100;

    const { orderItems, shippingAddress, totalPrice } = req.body;
    const user = await User.findById(req.userAuthId);

    if(!user?.hasShippingAddress){
        throw new Error("Vui lòng cung cấp địa chỉ giao hàng");
    }

    if(orderItems?.length <= 0){
        throw new Error("Không có sản phẩm nào được đặt");
    }

    const order = await Order.create({
        user: user?._id,
        orderItems,
        shippingAddress,
        totalPrice: couponFound ? totalPrice - totalPrice * discount : totalPrice,
    });



    const products = await Product.find({ _id: { $in: orderItems } });

    orderItems?.map(async (order) => {
        const product = products?.find((product) => {
            return product?._id?.toString() === order?._id?.toString();
        });
        if(product){
            product.totalSold += order.qty;
        }
        await product.save();
    });

    user.orders.push(order?._id);
    await user.save();

    res.json({
        success: true,
        message: "Tạo đơn đặt hàng thành công",
        order,
        user,
    });
});

export const getAllOrdersCtrl = asyncHandler(async (req, res) => {
    const orders = await Order.find();
    res.json({
        success: true,
        message: "Tất cả đơn đặt hàng",
        orders,
    })
});

export const getSingleOrderCtrl = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const order = await Order.findById(id);

    res.status(200).json({
        success: true,
        message: "Đơn đặt hàng",
        order,
    });
});

export const updateOrderCtrl = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const updateOrder = await Order.findByIdAndUpdate(
        id,
        {
            status: req.body.status,
        },
        {
            new: true,
        }
    );

    res.status(200).json({
        success: true,
        message: "Đơn hàng đã được cập nhật",
        updateOrder,
    });
});

export const getSalesSumCtrl = asyncHandler(async (req, res) => {

    const orders = await Order.aggregate([
        {
            $group: {
                _id: null,
                minimumSale:{
                    $min: "$totalPrice",
                },
                totalSales: {
                    $sum: "$totalPrice",
                },
                maxSales:{
                    $max: "$totalPrice",
                },
                avgSales:{
                    $avg: "$totalPrice",
                },
            },
        },
    ]);

    const date = new Date();
    const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const saleToday = await Order.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: today,
                },
            },
        },
        {
            $group:{
                _id: null,
                totalSales: {
                    $sum: "$totalPrice",
                },
            },
        },
    ]);

    res.status(200).json({
        success: true,
        message: "Số lượng đơn đặt hàng",
        orders,
        saleToday,
    })
});
import asyncHandler from "express-async-handler";
import Review from "../model/Review.js";
import Product from "../model/Product.js";

export const createReviewCtrl = asyncHandler(async (req, res) => {
    const {product, message, rating} = req.body;

    const { productId } = req.params;
    const productFound = await Product.findById(productId).populate("reviews");
    if(!productFound){
        throw new Error("Không tìm thấy sản phẩm");
    }

    const hasReviewed = productFound?.reviews?.find((review) => {
        return review?.user.toString() === req?.userAuthId?.toString();
    });

    if(hasReviewed){
        throw new Error("Bạn đã đánh giá sản phẩm này rồi");
    }

    const review = await Review.create({
        message,
        rating,
        product: productFound?._id,
        user: req.userAuthId,
    });

    productFound.reviews.push(review?._id);

    await productFound.save();
    res.status(201).json({
        success: true,
        message: "Tạo review thành công",
    });
});
import Brand from "../model/Brand.js";
import Category from "../model/Category.js";
import Product from "../model/Product.js";
import asyncHandler from 'express-async-handler';

export const createProductCtrl = asyncHandler(async (req, res) => {
    const { name, description, category, sizes, colors, price, totalQty, brand } = req.body;
    const productExists = await Product.findOne({ name });

    if(productExists){
        throw new Error("Sản phẩm này đã tồn tại");
    }

    const categoryFound = await Category.findOne({
        name: category,
    });

    if(!categoryFound){
        throw new Error("Không tồn tại loại sản phẩm này, hãy thêm loại sản phẩm này trước hoặc kiểm tra lại");
    }

    const brandFound = await Brand.findOne({
        name: brand?.toLowerCase(),
    });

    if(!brandFound){
        throw new Error("Không tồn tại hãng này, hãy thêm hãng này trước hoặc kiểm tra lại");
    }

    const product = await Product.create({
        name,
        description,
        category,
        sizes,
        colors,
        user: req.userAuthId,
        price,
        totalQty,
        brand,
    });

    categoryFound.products.push(product._id);
    await categoryFound.save();

    brandFound.products.push(product._id);
    await brandFound.save();

    res.json({
        status: "success",
        message: "Tạo mới sản phẩm thành công",
        product,
    });
});

export const getProductsCtrl = asyncHandler(async (req, res) => {
    console.log(req.query);

    let productQuery = Product.find();

    if(req.query.name){
        productQuery = productQuery.find({
            name: {$regex: req.query.name, $options: "i"},
        });
    }

    if(req.query.brand){
        productQuery = productQuery.find({
            brand: {$regex: req.query.brand, $options: "i"},
        });
    }

    if(req.query.category){
        productQuery = productQuery.find({
            category: {$regex: req.query.category, $options: "i"},
        });
    }

    if(req.query.colors){
        productQuery = productQuery.find({
            colors: {$regex: req.query.colors, $options: "i"},
        });
    }

    if(req.query.size){
        productQuery = productQuery.find({
            sizes: {$regex: req.query.size, $options: "i"},
        });
    }

    if(req.query.price){
        const priceRange = req.query.price.split("-");
        productQuery = productQuery.find({
            price:{$gte: priceRange[0], $lte: priceRange[1]},
        });
    }


    const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
  
    const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10;

    const startIndex = (page - 1) * limit;

    const endIndex = page * limit;

    const total = await Product.countDocuments();

    productQuery = productQuery.skip(startIndex).limit(limit);

    const products = await productQuery;

    const pagination = {};
    if(endIndex < total){
        pagination.next = {
            papge: page + 1,
            limit,
        };
    }
    if(startIndex > 0){
        pagination.prev = {
            page: page - 1,
            limit,
        };
    }

    res.json({
        status: "success",
        total,
        results: products.length,
        pagination,
        message: "Tìm sản phẩm thành công",
        products,
    });
});

export const getProductCtrl = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate("reviews");
    if(!product){
        throw new Error("Không tìm thấy sản phẩm");
    }
    res.json({
        status: "success",
        message: "Tìm sản phẩm thành công",
        product,
    })
});

export const updateProductCtrl = asyncHandler(async (req, res) => {
    const { name, description, category, sizes, colors, user, price, totalQty, brand } = req.body;

    const product = await Product.findByIdAndUpdate(req.params.id, {
        name,
        description,
        category,
        sizes,
        colors,
        user,
        price,
        totalQty,
        brand,
    },{
        new: true,
    });

    res.json({
        status: "success",
        message: "Cập nhật sản phẩm thành công",
        product,
    })
});

export const deleteProdductCtrl = asyncHandler(async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);

    res.json({
        status: "success",
        message: "Xóa sản phẩm thành công",
    })
});
const Product = require('../models/productModel');
const ErrorHandler = require('../utilities/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError');
const ApiFeatures = require('../utilities/apifeatures');

const createProduct = catchAsyncError(async (req,res,next)=>{
    req.body.user = req.user._id;
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product,
    })
})

const getAllProduct = catchAsyncError(async (req,res, next)=>{
    const resultPerPage = 8;
    const productCount = await Product.countDocuments();
    const apiFeatures = new ApiFeatures(Product.find(),req.query)
    .search()
    .filter();

    let products = await apiFeatures.query;

    let filterProductCount = products.length;

    apiFeatures.pagination(resultPerPage);

    products = await apiFeatures.query.clone();

    res.status(201).json({
        success: true,
        products,
        productCount,
        resultPerPage,
        filterProductCount,
    })
}) 

const getProductDetails = catchAsyncError(async (req,res,next)=>{
    let product = await Product.findById(req.params.id);

    res.status(201).json({
        success: true,
        product,
    })
})

const updateProduct = catchAsyncError(async (req,res,next)=>{
    let product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product not found!", 404));
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        'new': true,
        'runValidators': true,
    });

    res.status(201).json({
        success: true,
        product,
    })
})

const deleteProduct = catchAsyncError(async (req,res,next)=>{
    let product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product not found!", 404));
    }
    await product.deleteOne();
    res.status(201).json({
        success: false,
        message: "product deleted successfully!",
    }) 
})

const createProductReview = catchAsyncError(async (req, res, next)=>{
    const {rating, comment, productId} = req.body;

    const review = {
        user: req.user.id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find((rev)=>rev.user.toString() === req.user.id);

    if(isReviewed){
        product.reviews.forEach((rev)=>{
            if(rev.user.toString() === req.user.id.toString()){
                rev.rating = rating;
                rev.comment = comment;
            }
        })
    }else{
        product.reviews.push(review);
        product.numberOfReviews = product.reviews.length;
    }

    let sum = 0;
    product.reviews.forEach((rev)=>{
        sum += rev.rating;
    })

    product.ratings = sum / product.reviews.length;

    await product.save({validateBeforeSave: false});

    res.status(200).json({
        success: true,
        product
    })
})

const getAllReviews = catchAsyncError(async (req, res, next)=>{
    const product = await Product.findById(req.query.productId);

    if(!product){
        return next(new ErrorHandler("Product not found!",404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews,
    })
})

const deleteReview = catchAsyncError(async (req, res, next)=>{
    const product = await Product.findById(req.query.productId);

    if(!product){
        return next(new ErrorHandler("Product not found!",404));
    }

    const reviews = product.reviews.filter((review)=>review._id.toString() !== req.query.reviewId.toString());

    let sum = 0;
    reviews.forEach((rev)=>{
        sum += rev.rating;
    })

    const ratings = sum / reviews.length;

    const numberOfReviews = reviews.length;

    const updatedProduct = await Product.findByIdAndUpdate(req.query.productId,{
        ratings, reviews, numberOfReviews
    },{
        new: true,
        runValidators: true,
    })

    res.status(200).json({
        success: true,
        updatedProduct,
    })
})

module.exports = {
    getAllProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductDetails,
    createProductReview,
    getAllReviews,
    deleteReview,
}
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
    const resultPerPage = 5;
    const productCount = await Product.countDocuments();
    const apiFeatures = new ApiFeatures(Product.find(),req.query)
    .search()
    .filter()
    .pagination(resultPerPage)
    ;
    const products = await apiFeatures.query;

    res.status(201).json({
        success: true,
        products,
        productCount
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
            if(rev.user.toString() === req.user.id){
                review.rating = rating;
                review.comment = comment;
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

module.exports = {
    getAllProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductDetails,
    createProductReview,
}
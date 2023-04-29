const Order = require('../models/orderModel');
const ErrorHandler = require('../utilities/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError');
const Product = require('../models/productModel');

const newOrder = catchAsyncError(async (req, res, next)=>{
    const {shippingInfo, orderItems, paymentInfo, itemPrice, taxPrice, shippingPrice, totalPrice} = req.body;

    const order = await Order.create({
        shippingInfo, orderItems, paymentInfo, itemPrice, taxPrice, shippingPrice, totalPrice,
        paidAt: Date.now(),
        user: req.user.id,
    })
    
    res.status(200).json({
        success: true,
        order
    })
})

const getSingleOrder = catchAsyncError(async (req, res, next)=>{
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if(!order){
        return next(new ErrorHandler("Order not found!",404));
    }

    res.status(200).json({
        success: true,
        order
    })
})

const myOrders = catchAsyncError(async (req, res, next)=>{
    const order = await Order.find({user: req.user.id});

    if(!order){
        return next(new ErrorHandler("Order not found!",404));
    }

    res.status(200).json({
        success: true,
        order
    })
})

const getAllOrders = catchAsyncError(async (req, res, next)=>{
    const orders = await Order.find();

    let totalAmount = 0;
    orders.forEach((order)=>{
        totalAmount += order.totalPrice;
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
})

const updateOrder = catchAsyncError(async (req, res, next)=>{
    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler("Order not found!",404));
    }

    if(order.orderStatus === "delivered"){
        return next(new ErrorHandler("You have been already delivered this order!",404));
    }

    order.orderItems.forEach(async (item)=>{
        await updateStock(item.product, item.quantity);
    })

    order.orderStatus = req.body.status;

    if(order.orderStatus === "delivered"){
        order.deliveredAt = Date.now();
    }

    await order.save({validateBeforeSave: false});

    res.status(200).json({
        success: true,
        order
    })
})

async function updateStock(productId, quantity){
    const product = await Product.findById(productId);

    if(!product){
        return next(new ErrorHandler("Product not found!",404));
    }

    product.stock -= quantity;

    await product.save({validateBeforeSave: false});
}

const deleteOrder = catchAsyncError(async (req, res, next)=>{
    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler("Order not found!",404));
    }

    await order.deleteOne();

    res.status(200).json({
        success: true,
        message: "Order deleted successfully!",
    })
})

module.exports = {
    newOrder,
    getSingleOrder,
    myOrders,
    getAllOrders,
    updateOrder,
    deleteOrder,
}
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const catchAsyncError = require("../middlewares/catchAsyncError");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const processPayment = catchAsyncError(async (req, res, next)=>{
    const payment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "usd",
        metadata: {
            "company": "MERN-ECCOMERCE",
        }
    })

    res.status(200).json({
        success: true,
        client_secret: payment.client_secret,
    })
})

const getStripeApiKey = catchAsyncError(async (req, res, next)=>{
    res.status(200).json({stripeApiKey: process.env.STRIPE_API_KEY});
})

const getRazorKey = catchAsyncError(async (req, res, next)=>{
    res.status(200).json({key: process.env.RAZORPAY_API_KEY});
})

var instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_APT_SECRET,
  });

const checkout = catchAsyncError(async(req, res, next)=>{
    var options = {
        amount: Number(req.body.total*100), 
        currency: "INR",
      };
      const order = await instance.orders.create(options);
      console.log(order);
      res.json({success: true, order});
})

const paymentVerification = catchAsyncError(async(req, res, next)=>{
      const {razor_payment_id, razorpay_order_id, razorpay_signature} = req.body;
      const body = razorpay_order_id+"|"+razor_payment_id;
      const expected_signature = crypto.createHmac("sha256",process.env.RAZORPAY_APT_SECRET).update(body.toString()).digest("hex");

      if(expected_signature === razorpay_signature){
        res.json({success: true});
      }else{
        res.json({success: false});
      }
})

module.exports = {
    processPayment,
    getStripeApiKey,
    getRazorKey,
    checkout,
    paymentVerification,
}
const express = require('express');
const { isAuthenticateUser } = require('../middlewares/auth');
const { processPayment, getStripeApiKey, checkout, getRazorKey, paymentVerification } = require('../controllers/paymentController');

const router = express.Router();

router.post("/payment/process", isAuthenticateUser, processPayment);
router.get("/stripeapikey", isAuthenticateUser, getStripeApiKey);
router.get("/razorKey", isAuthenticateUser, getRazorKey);
router.post("/payment/checkout",isAuthenticateUser, checkout);
router.post("/payment/paymentVerification",isAuthenticateUser, paymentVerification);

module.exports = router;
const express = require('express');
const { getAllProduct, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview } = require('../controllers/productController');
const { isAuthenticateUser, authorizedRoles } = require('../middlewares/auth');

const router = express.Router();

router.post('/admin/product/new',isAuthenticateUser,authorizedRoles("admin"),createProduct);
router.get('/product',getAllProduct);
router.get('/product/:id',getProductDetails);
router.put('/admin/product/:id',isAuthenticateUser,authorizedRoles("admin"),updateProduct);
router.delete('/admin/product/:id',isAuthenticateUser,authorizedRoles("admin"),deleteProduct);
router.put('/review', isAuthenticateUser, createProductReview);

module.exports = router; 
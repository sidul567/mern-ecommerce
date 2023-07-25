const express = require('express');
const { getAllProduct, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteReview, getAdminProduct } = require('../controllers/productController');
const { isAuthenticateUser, authorizedRoles } = require('../middlewares/auth');
const productUpload = require('../middlewares/productUpload');

const router = express.Router();

router.post('/admin/product/new',isAuthenticateUser,authorizedRoles("admin"),productUpload, createProduct);
router.get('/products',getAllProduct);
router.get('/admin/products',isAuthenticateUser, authorizedRoles("admin"), getAdminProduct);
router.get('/product/:id',getProductDetails);
router.put('/admin/product/:id',isAuthenticateUser,authorizedRoles("admin"),productUpload, updateProduct);
router.delete('/admin/product/:id',isAuthenticateUser,authorizedRoles("admin"),deleteProduct);
router.put('/review', isAuthenticateUser, createProductReview);
router.get('/reviews', isAuthenticateUser, getProductReviews);
router.delete('/review', isAuthenticateUser, deleteReview);

module.exports = router; 
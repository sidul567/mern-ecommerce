const express = require('express');
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require('../controllers/orderController');
const { isAuthenticateUser, authorizedRoles } = require('../middlewares/auth');

const router = express.Router();

router.post('/order/new', isAuthenticateUser, newOrder);
router.get('/order/:id', isAuthenticateUser, getSingleOrder);
router.get('/orders/me', isAuthenticateUser, myOrders);
router.get('/admin/orders', isAuthenticateUser, authorizedRoles("admin"), getAllOrders);
router.put('/admin/order/:id', isAuthenticateUser, authorizedRoles("admin"), updateOrder);
router.delete('/admin/order/:id', isAuthenticateUser, authorizedRoles("admin"), deleteOrder);

module.exports = router;
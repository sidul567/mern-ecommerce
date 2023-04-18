const express = require('express');
const { registerUser, loginUser, logoutUser, forgetPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUsers, getSingleUser, updateUserRole, deleteUser } = require('../controllers/userController');
const { isAuthenticateUser, authorizedRoles } = require('../middlewares/auth');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.post('/password/forget', forgetPassword);
router.put('/password/reset/:token',resetPassword);
router.get('/me', isAuthenticateUser, getUserDetails);
router.put('/password/update', isAuthenticateUser, updatePassword);
router.put('/me/update', isAuthenticateUser, updateProfile);
router.get('/admin/users', isAuthenticateUser, authorizedRoles("admin"), getAllUsers);
router.get('/admin/user/:id', isAuthenticateUser, authorizedRoles("admin"), getSingleUser);
router.put('/admin/user/:id', isAuthenticateUser, authorizedRoles("admin"), updateUserRole);
router.delete('/admin/user/:id', isAuthenticateUser, authorizedRoles("admin"), deleteUser);

module.exports = router;
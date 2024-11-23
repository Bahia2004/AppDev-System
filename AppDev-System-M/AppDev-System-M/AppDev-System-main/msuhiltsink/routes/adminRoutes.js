const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Signup Route
router.get('/admin/signup', adminController.signupForm);
router.post('/signup', adminController.signup);

// Login Route
router.get('/admin/login', adminController.loginForm);
router.post('/admin/login', adminController.login);

// Logout Route
//router.get('/logout', adminController.logout);

module.exports = router;

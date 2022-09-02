const express = require('express');
const router = express.Router();

// Users API
router.use('/users', require('./users'));

// Auth API
router.use('/auth', require('./auth'));

// User Info API
router.use('/user-info', require('./user-info'));

// User Types API
router.use('/user-types', require('./user-types'));

// Emergency Types API
router.use('/emergency-types', require('./emergency-types'));

module.exports = router;

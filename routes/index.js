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

// Emergency Statuses API
router.use('/emergency-statuses', require('./emergency-statuses'));

// Emergency Categories API
router.use('/emergency-categories', require('./emergency-categories'));

module.exports = router;

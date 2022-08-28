const express = require('express');
const router = express.Router();

// Users API
router.use('/users', require('./users'));

// Auth API
router.use('/auth', require('./auth'));

module.exports = router;

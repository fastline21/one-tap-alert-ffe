const express = require("express");
const router = express.Router();

// Users API
router.use("/users", require("./users"));

// Auth API
router.use("/auth", require("./auth"));

// User Info
router.use("/user-info", require("./user-info"));

// Emergency Types
router.use("/emergency-types", require("./emergency-types"));

module.exports = router;

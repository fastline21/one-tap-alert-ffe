const express = require('express');

const router = express.Router();

const routeAuth = require('./../middleware/route-auth');
const auth = require('./../middleware/auth');

const UserTypes = require('./../models/user_types');

// Get all user types
router.get('/', routeAuth, auth, async (req, res) => {
  const result = await UserTypes.find().select(
    '-date_added -date_modified -date_deleted'
  );

  res.status(200).json({ data: { user_types: result }, status_code: 200 });
});

// Get user type
router.get('/:id', routeAuth, auth, async (req, res) => {
  const { id } = req.params;

  const result = await UserTypes.findById(id).select(
    '-date_added -date_modified -date_deleted'
  );

  res.status(200).json({ data: { user_type: result }, status_code: 200 });
});

// Create new user type

// Update user type

// Delete user type

module.exports = router;

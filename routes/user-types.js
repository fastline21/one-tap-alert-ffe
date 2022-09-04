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
router.patch('/:id', routeAuth, auth, async (req, res) => {
  const {
    params: { id },
    body: { name },
  } = req;

  try {
    const result = await UserTypes.findByIdAndUpdate(id, { name });

    res.status(200).json({
      data: { message: `You successfully update ${result.name}` },
      status_code: 200,
    });
  } catch (error) {
    res.status(error.status_code).json({
      data: { message: error.message },
      status_code: error.status_code,
    });
  }
});

// Delete user type

module.exports = router;

const express = require('express');

const router = express.Router();

const UserInfo = require('./../models/user_info');

const routeAuth = require('./../middleware/route-auth');
const auth = require('./../middleware/auth');

// Get all user info

// Get single user info
router.get('/:id', routeAuth, auth, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await UserInfo.findById(id).select(
      '-date_added -date_modified -date_deleted'
    );

    res.status(200).json({ data: { user_info: result }, status_code: 200 });
  } catch (error) {
    console.error(JSON.stringify(error));
    res
      .status(500)
      .json({ data: { message: 'Server error' }, status_code: 500 });
  }
});

// Create user info

// Update user info

// Delete user info

module.exports = router;

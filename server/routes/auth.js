const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Users = require('./../models/users');
const UserTypes = require('./../models/user_types');

const routeAuth = require('./../middleware/route-auth');
const auth = require('./../middleware/auth');

const addExceptions = require('../utils/addExceptions');

router.post('/', routeAuth, async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(404).json({
      data: { message: 'Please fill in all the required fields' },
      status_code: 404,
    });
  }

  try {
    let user = await Users.findOne({ username });

    if (!user) {
      return res
        .status(404)
        .json({ data: { message: 'User not found' }, status_code: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ data: { message: 'Invalid Credentials' }, status_code: 400 });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
      if (err) throw err;

      return res.status(200).json({ data: { token }, status_code: 200 });
    });
  } catch (error) {
    console.error(JSON.stringify(error));
    return res
      .status(500)
      .json({ data: { message: 'Server error' }, status_code: 500 });
  }
});

router.get('/', routeAuth, auth, async (req, res) => {
  try {
    const user = await Users.findById(req.user.id)
      .select('-password -date -username')
      .populate([{ path: 'user_type_id', model: UserTypes }]);

    console.log('Success: Get auth user - user', { user });

    res.json({
      data: { user_id: user._id, user_type: user.user_type_id.name },
      status_code: 200,
    });
  } catch (error) {
    console.error(JSON.stringify(error));
    res
      .status(500)
      .json({ data: { message: 'Server Error' }, status_code: 500 });
  }
});

module.exports = router;

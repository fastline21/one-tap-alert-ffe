const express = require('express');
const bcrypt = require('bcryptjs');

const router = express.Router();

const { USER_TYPES } = require('./../constants/user_types');
const { GENDER } = require('./../constants/gender');

const Users = require('./../models/users');
const UserInfo = require('./../models/user_info');
const Contacts = require('./../models/contacts');

const routeAuth = require('./../middleware/route-auth');
const auth = require('../middleware/auth');

// Get all users
router.get('/', routeAuth, auth, async (req, res) => {
  try {
    const result = await Users.find({
      date_deleted: { $exists: false },
    }).select('-password -date_added -date_modified -date_deleted');

    return res.status(200).json({ data: { users: result }, status_code: 200 });
  } catch (error) {
    console.error(JSON.stringify(error));
    return res
      .status(500)
      .json({ data: { message: 'Server error' }, status_code: 500 });
  }
});

// Get single user
router.get('/:id', routeAuth, auth, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Users.findById(id).select(
      '-password -date_added -date_modified -date_deleted'
    );

    return res.status(200).json({ data: { user: result }, status_code: 200 });
  } catch (error) {
    console.error(JSON.stringify(error));
    return res
      .status(500)
      .json({ data: { message: 'Server error' }, status_code: 500 });
  }
});

// Create new user
router.post('/', routeAuth, auth, async (req, res) => {
  const { username, password, password2, user_type_id } = req.body;

  // Required fields
  if ((!username, !password, !user_type_id)) {
    return res.status(404).json({
      error: 'Please fill in all the required fields',
    });
  }

  // Mismatch password
  if (password !== password2) {
    return res.status(400).json({ error: 'Password not match' });
  }

  try {
    const user = await Users.findOne({ username });

    // Exists user
    if (user) {
      return res.status(400).json({ message: 'User already registered' });
    }

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(String(password), salt);

    // New User
    const newUser = new Users({
      username,
      password: newPassword,
      user_type_id,
    });

    await newUser.save();

    return res.status(200).json({
      data: { message: `${name} is successfully created` },
      status_code: 200,
    });
  } catch (error) {
    console.error(JSON.stringify(error));
    return res
      .status(500)
      .json({ data: { message: 'Server error' }, status_code: 500 });
  }
});

// Register user - For mobile app
router.post('/register', routeAuth, async (req, res) => {
  // TODO: Create Barangay Model
  const {
    username,
    password,
    password2,
    first_name: firstName,
    middle_name: middleName,
    last_name: lastName,
    address,
    // barangay_id: barangayID,
    birth_date: birthDate,
    email_address: emailAddress,
  } = req.body;

  // Required fields
  if (
    !username ||
    !password ||
    !password2 ||
    !firstName ||
    !lastName ||
    !address ||
    // !barangayID ||
    !birthDate ||
    !emailAddress
  ) {
    return res.status(404).json({
      data: {
        message: 'Please fill in all the required fields',
      },
      status_code: 404,
    });
  }

  // Mismatch password
  if (password !== password2) {
    return res
      .status(400)
      .json({ data: { message: 'Password not match' }, status_code: 400 });
  }

  try {
    const user = await Users.findOne({
      username,
      date_deleted: { $exists: false },
    });

    // Exists user
    if (user) {
      return res.status(400).json({
        data: { message: 'User already registered' },
        status_code: 400,
      });
    }

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(String(password), salt);

    // New user
    const newUser = new Users({
      username,
      password: newPassword,
      user_type_id: USER_TYPES.RESIDENT,
    });

    // Get the new user id
    const { _id: userID } = await newUser.save();

    // New user info
    const newUserInfo = new UserInfo({
      user_id: userID,
      first_name: firstName,
      middle_name: middleName,
      last_name: lastName,
      birth_date: birthDate,
      gender_id: GENDER['MALE'],
    });

    await newUserInfo.save();

    // New user contact
    const newContact = new Contacts({
      user_id: userID,
      own_table_name: 'users',
      own_primary_key: userID,
      contact_type_id: '630c79442759731d5879078b', // TODO: Change this to Contact Types Model
      email_address: emailAddress,
    });

    await newContact.save();

    return res.status(200).json({
      data: { message: 'You successfully register an account' },
      status_code: 200,
    });
  } catch (error) {
    console.error(JSON.stringify(error));
    return res
      .status(500)
      .json({ data: { message: 'Server error' }, status_code: 500 });
  }
});

// Update user

// Delete user
router.delete('/:id', routeAuth, auth, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Users.findByIdAndUpdate(id, {
      $set: {
        date_deleted: Date.now(),
      },
    });

    return res.status(200).json({
      data: { message: `You successfully delete ${result.name}` },
      status_code: 200,
    });
  } catch (error) {
    console.error(JSON.stringify(error));
    return res
      .status(500)
      .json({ data: { message: 'Server error' }, status_code: 500 });
  }
});

module.exports = router;

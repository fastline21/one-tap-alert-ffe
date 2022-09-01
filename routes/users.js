const express = require('express');
const bcrypt = require('bcryptjs');

const router = express.Router();

const { USER_TYPES } = require('./../constants/user_types');

const Users = require('./../models/users');
const UserInfo = require('./../models/user_info');
const Contacts = require('./../models/contacts');

const routeAuth = require('./../middleware/route-auth');

router.get('/', routeAuth, async (req, res) => {
  const result = await Users.find();

  res.json({ data: result });
});

router.post('/', async (req, res) => {
  const { username, password, password2, user_type_id } = req.body;

  if ((!username, !password, !user_type_id)) {
    return res.status(404).json({
      error: 'Please fill in all the required fields',
    });
  }

  if (password !== password2) {
    return res.status(400).json({ error: 'Password not match' });
  }

  try {
    const user = await Users.findOne({ username });

    if (user) {
      return res.status(400).json({ message: 'User already registered' });
    }

    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(String(password), salt);

    const newUser = new Users({
      username,
      password: newPassword,
      user_type_id,
    });

    await newUser.save();
    return res.json({ data: { success: true } });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: 'Server Error' });
  }
});

router.post('/register', routeAuth, async (req, res) => {
  const {
    username,
    password,
    password2,
    first_name: firstName,
    middle_name: middleName,
    last_name: lastName,
    address,
    barangay_id: barangayID,
    birth_date: birthDate,
    email_address: emailAddress,
  } = req.body;

  // if (
  // 	!username ||
  // 	!password ||
  // 	!password2 ||
  // 	!firstName ||
  // 	!middleName ||
  // 	!lastName ||
  // 	!address ||
  // 	!barangayID ||
  // 	!birthDate ||
  // 	!emailAddress
  // ) {
  // 	return res.status(404).json({
  // 		data: {
  // 			message: "Please fill in all the required fields",
  // 		},
  // 		status_code: 404,
  // 	});
  // }

  // if (password !== password2) {
  // 	return res
  // 		.status(400)
  // 		.json({ data: { message: "Password not match" }, status_code: 400 });
  // }

  try {
    console.log({ username });
    const user = await Users.findOne({ username });

    if (user) {
      return res.status(400).json({
        data: { message: 'User already registered' },
        status_code: 400,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(String(password), salt);

    const newUser = new Users({
      username,
      password: newPassword,
      user_type_id: USER_TYPES.RESIDENT,
    });

    const { _id: userID } = await newUser.save();

    const newUserInfo = new UserInfo({
      first_name: firstName,
      middle_name: middleName,
      last_name: lastName,
      birth_date: birthDate,
    });

    const newContact = new Contacts({
      user_id: userID,
      own_table_name: 'users',
      own_primary_key: userID,
    });

    return res.json({
      data: { message: 'You successfully register an account' },
      status_code: 200,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: 'Server Error' });
  }
});

module.exports = router;

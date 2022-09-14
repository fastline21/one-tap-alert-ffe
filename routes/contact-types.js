const express = require('express');
const moment = require('moment/moment');

const router = express.Router();

const routeAuth = require('./../middleware/route-auth');
const auth = require('./../middleware/auth');

const ContactTypes = require('./../models/contact_types');
const { convertRawTag, removeHTMLCode } = require('../utils/rawTag');

// Get all contact types
router.get('/', routeAuth, auth, async (req, res) => {
  try {
    const result = await ContactTypes.find({
      date_deleted: { $exists: false },
    }).select('-date_added -date_modified -date_deleted');

    return res
      .status(200)
      .json({ data: { contact_types: result }, status_code: 200 });
  } catch (error) {
    console.error(JSON.stringify(error));
    return res
      .status(500)
      .json({ data: { message: 'Server error' }, status_code: 500 });
  }
});

// Get single contact types
router.get('/:id', routeAuth, auth, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await ContactTypes.findById(id).select(
      '-date_added -date_modified -date_deleted'
    );

    return res
      .status(200)
      .json({ data: { contact_type: result }, status_code: 200 });
  } catch (error) {
    console.error(JSON.stringify(error));
    return res
      .status(500)
      .json({ data: { message: 'Server error' }, status_code: 500 });
  }
});

// Create new contact types
router.post('/', routeAuth, auth, async (req, res) => {
  const { name, tag } = req.body;

  if (!name) {
    return res.status(404).json({
      data: { message: 'Please fill in all the required fields' },
      status_code: 404,
    });
  }

  const newName = removeHTMLCode(name);
  const newTag = tag ? convertRawTag(tag) : convertRawTag(name);

  try {
    const newUserType = new ContactTypes({ name: newName, tag: newTag });

    await newUserType.save();

    return res.status(200).json({
      data: { message: `${newName} is successfully created` },
      status_code: 200,
    });
  } catch (error) {
    console.error(JSON.stringify(error));
    return res
      .status(500)
      .json({ data: { message: 'Server error' }, status_code: 500 });
  }
});

// Update contact types
router.patch('/:id', routeAuth, auth, async (req, res) => {
  const {
    params: { id },
    body: { name },
  } = req;

  if (!name) {
    return res.status(404).json({
      data: { message: 'Name is required' },
      status_code: 404,
    });
  }

  try {
    const result = await ContactTypes.findByIdAndUpdate(id, { name });

    return res.status(200).json({
      data: { message: `You successfully update ${result.name}` },
      status_code: 200,
    });
  } catch (error) {
    console.error(JSON.stringify(error));
    return res
      .status(500)
      .json({ data: { message: 'Server error' }, status_code: 500 });
  }
});

// Delete contact types
router.delete('/:id', routeAuth, auth, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await ContactTypes.findByIdAndUpdate(id, {
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

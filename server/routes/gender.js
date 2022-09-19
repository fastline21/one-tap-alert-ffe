const express = require('express');
const moment = require('moment/moment');

const router = express.Router();

const routeAuth = require('./../middleware/route-auth');
const auth = require('./../middleware/auth');

const Gender = require('./../models/gender');

// Get all gender
router.get('/', routeAuth, auth, async (req, res) => {
  try {
    const result = await Gender.find({
      date_deleted: { $exists: false },
    }).select('-date_added -date_modified -date_deleted');

    return res.status(200).json({ data: { gender: result }, status_code: 200 });
  } catch (error) {
    console.error(JSON.stringify(error));
    return res
      .status(500)
      .json({ data: { message: 'Server error' }, status_code: 500 });
  }
});

// Get single gender
router.get('/:id', routeAuth, auth, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Gender.findById(id).select(
      '-date_added -date_modified -date_deleted'
    );

    return res
      .status(200)
      .json({ data: { user_type: result }, status_code: 200 });
  } catch (error) {
    console.error(JSON.stringify(error));
    return res
      .status(500)
      .json({ data: { message: 'Server error' }, status_code: 500 });
  }
});

// Create new gender
router.post('/', routeAuth, auth, async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res
      .status(404)
      .json({ data: { message: 'Name is required' }, status_code: 404 });
  }

  try {
    const newGender = new Gender({ name });

    await newGender.save();

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

// Update gender
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
    const result = await Gender.findByIdAndUpdate(id, { name });

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

// Delete gender
router.delete('/:id', routeAuth, auth, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Gender.findByIdAndUpdate(id, {
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

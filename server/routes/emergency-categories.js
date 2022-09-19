const express = require('express');
const bcrypt = require('bcryptjs');

const router = express.Router();

const EmergencyCategories = require('./../models/emergency_categories');

const routeAuth = require('./../middleware/route-auth');
const auth = require('./../middleware/auth');

// Get all emergency categories
router.get('/', routeAuth, auth, async (req, res) => {
  try {
    const result = await EmergencyCategories.find({
      date_deleted: { $exists: false },
    }).select('-date_added -date_modified -date_deleted');

    res
      .status(200)
      .json({ data: { emergency_categories: result }, status_code: 200 });
  } catch (error) {
    console.error(JSON.stringify(error));
    res
      .status(500)
      .json({ data: { message: 'Server error' }, status_code: 500 });
  }
});

// Get single emergency category
router.get('/:id', routeAuth, auth, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await EmergencyCategories.findById(id).select(
      '-date_added -date_modified -date_deleted'
    );

    res
      .status(200)
      .json({ data: { emergency_category: result }, status_code: 200 });
  } catch (error) {
    console.error(JSON.stringify(error));
    res
      .status(500)
      .json({ data: { message: 'Server error' }, status_code: 500 });
  }
});

// Create new emergency category
router.post('/', routeAuth, auth, async (req, res) => {
  const { name, description = '' } = req.body;

  if (!name) {
    return res
      .status(404)
      .json({ data: { message: 'Name is required' }, status_code: 404 });
  }

  try {
    const newEmergencyType = new EmergencyCategories({ name, description });

    await newEmergencyType.save();

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

// Update emergency category
router.patch('/:id', routeAuth, auth, async (req, res) => {
  const {
    params: { id },
    body: { name, description },
  } = req;

  if (!name) {
    return res.status(404).json({
      data: { message: 'Name is required' },
      status_code: 404,
    });
  }

  try {
    const result = await EmergencyCategories.findByIdAndUpdate(id, {
      name,
      description,
    });

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

// Delete emergency category
router.delete('/:id', routeAuth, auth, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await EmergencyCategories.findByIdAndUpdate(id, {
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

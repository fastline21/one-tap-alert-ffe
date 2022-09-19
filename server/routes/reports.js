const express = require('express');

const router = express.Router();

const routeAuth = require('./../middleware/route-auth');
const auth = require('./../middleware/auth');

const Reports = require('../models/reports');

// Get all reports

// Get single report

// Create report
router.post('/', routeAuth, auth, async (req, res) => {
  const { start_date: startDate } = req.body;
  const { file } = req.files;

  // TODO: Convert this route to Form-Data accept

  try {
    // TODO: Update this new form
    const newReport = new Reports({
      start_date: startDate,
      file: '', // Replace with real data
    });
  } catch (error) {
    console.error(JSON.stringify(error));
    return res
      .status(500)
      .json({ data: { message: 'Server error' }, status_code: 500 });
  }
});

// Update report

// Delete report

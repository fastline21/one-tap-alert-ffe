const express = require('express');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Models
const EmergenciesModel = require('./../models/emergencies');
const EmergencyStatusesModel = require('../models/emergency_statuses');

// Middleware
const routeAuth = require('./../middleware/route-auth');
const auth = require('./../middleware/auth');

/**
 * Create Emergency
 */
router.post('/', routeAuth, auth, async (req, res) => {
  const { emergency_type_id: emergencyTypeID, latitude, longitude } = req.body;
  const { id: userID } = req.user;
  const { captured_image_uri: capturedImageURI } = req.files;

  try {
    const uploadPathDir = path.join('./', 'server', 'captured-image');

    if (!fs.existsSync(uploadPathDir)) {
      fs.mkdirSync(uploadPathDir, { recursive: true });
    }

    const filename = uuidv4();
    const fileExt = path.extname(capturedImageURI.name);
    const file = `${filename}${fileExt}`;

    const uploadPath = path.resolve(uploadPathDir, file);

    capturedImageURI.mv(uploadPath);

    const PendingEmergencyStatus = await EmergencyStatusesModel.findOne({
      name: 'Pending',
    });

    const newEmergency = new EmergenciesModel({
      user_id: userID,
      emergency_type_id: emergencyTypeID,
      emergency_status_id: PendingEmergencyStatus._id,
      latitude,
      longitude,
    });

    await newEmergency.save();

    return res.status(200).json({
      data: { success: true, message: 'You successfully submit an emergency' },
      status_code: 200,
    });
  } catch (error) {
    console.error(JSON.stringify(error));
    return res
      .status(500)
      .json({ data: { message: 'Server Error' }, status_code: 500 });
  }
});

module.exports = router;

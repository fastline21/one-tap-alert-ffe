const express = require('express');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

const router = express.Router();

const routeAuth = require('./../middleware/route-auth');
const auth = require('./../middleware/auth');

const EmergencyProofsModel = require('../models/emergency_proofs');

/**
 * Create Emergency Proof
 */
router.post('/', routeAuth, auth, async (req, res) => {
  const { id: userID } = req.user;
  const {
    emergency_id: emergencyID,
    emergency_category_id: emergencyCategoryID,
  } = req.body;
  const { captured_image_uri: capturedImageURI } = req.files;

  try {
    const uploadPathDir = path.join(
      path.resolve('./'),
      'server',
      'captured-image'
    );

    if (!fs.existsSync(uploadPathDir)) {
      fs.mkdirSync(uploadPathDir, { recursive: true });
    }

    const filename = uuidv4();
    const fileExt = path.extname(capturedImageURI.name);
    const file = `${filename}${fileExt}`;

    const uploadPath = path.resolve(uploadPathDir, file);

    capturedImageURI.mv(uploadPath);

    const newEmergencyProof = new EmergencyProofsModel({
      user_id: userID,
      emergency_id: emergencyID,
      emergency_category_id: emergencyCategoryID,
      file,
    });

    const emergencyProof = await newEmergencyProof.save();

    return res.status(200).json({
      data: { emergency_proof: emergencyProof },
      status_code: 200,
      success: true,
      message: 'You successfully submit an emergency proof',
    });
  } catch (error) {
    console.error('Emergency Proof Create endpoint', JSON.stringify(error));
    return res.status(500).json({
      data: {},
      status_code: 500,
      message: 'Server Error',
      error: true,
    });
  }
});

module.exports = router;

const express = require('express');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Models
const EmergenciesModel = require('./../models/emergencies');
const EmergencyTypesModel = require('../models/emergency_types');
const EmergencyStatusesModel = require('../models/emergency_statuses');
const UsersModel = require('../models/users');
const UserInfoModel = require('../models/user_info');

// Middleware
const routeAuth = require('./../middleware/route-auth');
const auth = require('./../middleware/auth');

router.get('/', routeAuth, auth, async (req, res) => {
  try {
    const result = [];
    const emergencies = await EmergenciesModel.find({
      $or: [
        {
          date_deleted: { $exists: false },
        },
        {
          date_deleted: null,
        },
      ],
    }).populate([
      { path: 'emergency_type_id', model: EmergencyTypesModel },
      { path: 'emergency_status_id', model: EmergencyStatusesModel },
    ]);

    for (const emergency of emergencies) {
      const { user_id } = emergency;

      const userInfo = await UserInfoModel.findOne({
        user_id,
        $or: [
          {
            date_deleted: { $exists: false },
          },
          {
            date_deleted: null,
          },
        ],
      });

      result.push({ ...emergency.toJSON(), user_info: userInfo.toJSON() });
    }

    return res.status(200).json({
      data: { emergencies: result },
      status_code: 200,
      success: true,
      message: 'You successfully got all emergencies',
    });
  } catch (error) {
    console.error(JSON.stringify(error));
    return res
      .status(500)
      .json({ status_code: 500, error: true, message: 'Server error' });
  }
});

/**
 * Create Emergency
 */
router.post('/', routeAuth, auth, async (req, res) => {
  const { emergency_type_id: emergencyTypeID, latitude, longitude } = req.body;
  const { id: userID } = req.user;

  try {
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

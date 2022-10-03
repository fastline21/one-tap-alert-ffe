const express = require('express');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

const router = express.Router();

const Emergencies = require('./../models/emergencies');

const routeAuth = require('./../middleware/route-auth');
const auth = require('./../middleware/auth');

router.post('/', routeAuth, auth, (req, res) => {
  const { emergency_type_id, longitude, latitude } = req.body;
  const { id: user_id } = req.user;
  const { captured_image_uri } = req.files;

  // Log Capture Image URI
  console.log(captured_image_uri);

  const uploadPathDir = path.join('./', 'server', 'captured-image');

  if (!fs.existsSync(uploadPathDir)) {
    fs.mkdirSync(uploadPathDir, { recursive: true });
  }

  const filename = uuidv4();
  const fileExt = path.extname(captured_image_uri.name);
  const file = `${filename}${fileExt}`;

  const uploadPath = path.resolve(uploadPathDir, file);

  captured_image_uri.mv(uploadPath);

  res.json({ data: { success: true }, status_code: 200 });
});

module.exports = router;

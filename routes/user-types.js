const express = require('express');

const router = express.Router();

const routeAuth = require('./../middleware/route-auth');
const auth = require('./../middleware/auth');

const UserTypes = require('./../models/user_types');

router.get('/', routeAuth, auth, async (req, res) => {
  const result = await UserTypes.find().select(
    '-date_added -date_modified -date_deleted'
  );

  res.json({ data: { user_types: result }, status_code: 200 });
});

module.exports = router;

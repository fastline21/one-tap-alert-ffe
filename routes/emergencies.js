const express = require("express");

const router = express.Router();

const Emergencies = require("./../models/emergencies");

const routeAuth = require("./../middleware/route-auth");
const auth = require("./../middleware/auth");

router.post("/", routeAuth, auth, (req, res) => {
	const { emergency_type_id, longitude, latitude } = req.body;
	const { id: user_id } = req.user;

	res.json({ user_id, emergency_type_id, longitude, latitude });
});

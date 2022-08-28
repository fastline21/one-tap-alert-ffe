const express = require("express");
const bcrypt = require("bcryptjs");

const router = express.Router();

const EmergencyTypes = require("./../models/emergency_types");

const routeAuth = require("./../middleware/route-auth");
const auth = require("./../middleware/auth");

router.get("/", routeAuth, auth, async (req, res) => {
	const result = await EmergencyTypes.find();

	res.json({ data: result });
});

router.post("/", routeAuth, auth, async (req, res) => {
	const { name, description = "" } = req.body;

	const newEmergencyType = new EmergencyTypes({
		name,
		description,
	});

	await newEmergencyType.save();

	res.json({ data: { success: true } });
});

module.exports = router;

const express = require("express");
const bcrypt = require("bcryptjs");

const router = express.Router();

const Users = require("./../models/users");

const routeAuth = require("./../middleware/route-auth");

router.get("/", routeAuth, async (req, res) => {
	const result = await Users.find();

	res.json({ data: result });
});

router.post("/", async (req, res) => {
	const { username, password, password2, user_type_id } = req.body;

	if ((!username, !password, !user_type_id)) {
		return res.status(404).json({
			error: "Please fill in all the required fields",
		});
	}

	if (password !== password2) {
		return res.status(400).json({ error: "Password not match" });
	}

	try {
		const user = await Users.findOne({ username });

		if (user) {
			return res.status(400).json({ message: "User already registered" });
		}

		const salt = await bcrypt.genSalt(10);
		const newPassword = await bcrypt.hash(String(password), salt);

		const newUser = new Users({
			username,
			password: newPassword,
			user_type_id,
		});

		await newUser.save();
		return res.json({ data: { success: true } });
	} catch (error) {
		console.error(error.message);
		res.status(500).send({ error: "Server Error" });
	}
});

module.exports = router;

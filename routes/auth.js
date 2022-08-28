const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Users = require("./../models/users");

const routeAuth = require("./../middleware/route-auth");
const auth = require("./../middleware/auth");

router.post("/", routeAuth, async (req, res) => {
	const { username, password } = req.body;

	if (!username || !password) {
		return res
			.status(404)
			.json({ error: "Please fill in all the required fields." });
	}

	try {
		let user = await Users.findOne({ username });

		if (!user) {
			return res.status(404).json({ error: "User not found." });
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return res.status(400).json({ error: "Invalid Credentials" });
		}

		const payload = {
			user: {
				id: user.id,
			},
		};

		jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
			if (err) throw err;

			return res.json({ token });
		});
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server Error");
	}
});

router.get("/", routeAuth, auth, async (req, res) => {
	try {
		const user = await Users.findById(req.user.id).select(
			"-password -date -username"
		);

		res.json({ data: user });
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ error: "Server Error" });
	}
});

module.exports = router;

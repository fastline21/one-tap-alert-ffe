const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Users = require("./../models/users");

const routeAuth = require("./../middleware/route-auth");
const auth = require("./../middleware/auth");

router.post("/", routeAuth, async (req, res) => {
	console.log(req.body);
	const { username, password } = req.body;

	if (!username || !password) {
		return res.status(404).json({
			data: { message: "Please fill in all the required fields" },
			status_code: 404,
		});
	}

	try {
		let user = await Users.findOne({ username });

		if (!user) {
			return res
				.status(404)
				.json({ data: { message: "User not found" }, status_code: 404 });
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return res
				.status(400)
				.json({ data: { message: "Invalid Credentials" }, status_code: 400 });
		}

		const payload = {
			user: {
				id: user.id,
			},
		};

		jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
			if (err) throw err;

			return res.json({ data: { token }, status_code: 200 });
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

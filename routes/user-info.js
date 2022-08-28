const express = require("express");

const router = express.Router();

const routeAuth = require("./../middleware/route-auth");
const auth = require("./../middleware/auth");

const UserInfo = require("./../models/user_info");

router.get("/", routeAuth, auth, async (req, res) => {
	const result = await UserInfo.findOne({ user_id: req.user.id });

	console.log(result);

	res.json({ data: result });
});

router.post("/", routeAuth, auth, async (req, res) => {
	const { first_name, middle_name = "", last_name } = req.body;
	const { id: user_id } = req.user;

	const newUserInfo = new UserInfo({
		user_id,
		first_name,
		middle_name,
		last_name,
	});

	await newUserInfo.save();
	res.json({ data: { success: true } });
});

module.exports = router;

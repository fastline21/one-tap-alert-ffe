const mongoose = require("mongoose");

const UserInfoSchema = mongoose.Schema({
	user_id: {
		type: mongoose.SchemaTypes.ObjectId,
		required: true,
		ref: "users",
	},
	first_name: {
		type: String,
		required: true,
	},
	middle_name: {
		type: String,
	},
	last_name: {
		type: String,
		required: true,
	},
	date_added: {
		type: Date,
		default: Date.now,
	},
	date_modified: {
		type: Date,
		default: Date.now,
	},
	date_deleted: {
		type: Date,
	},
});

module.exports = mongoose.model("user_info", UserInfoSchema);

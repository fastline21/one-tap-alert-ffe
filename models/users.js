const mongoose = require("mongoose");

const { ObjectId } = mongoose.Types;

const UsersSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	user_type_id: {
		type: ObjectId,
		ref: "user_types",
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

module.exports = mongoose.model("users", UsersSchema);

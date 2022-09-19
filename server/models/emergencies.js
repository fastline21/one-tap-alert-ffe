const mongoose = require("mongoose");

const EmergenciesSchema = mongoose.Schema({
	user_id: {
		type: mongoose.SchemaTypes.ObjectId,
		required: true,
		ref: "users",
	},
	emergency_type_id: {
		type: mongoose.SchemaTypes.ObjectId,
		required: true,
		ref: "emergency_types",
	},
	emergency_status_id: {
		type: mongoose.SchemaTypes.ObjectId,
		required: true,
		ref: "emergency_statuses",
	},
	latitude: {
		type: String,
		required: true,
	},
	longitude: {
		type: String,
		required: true,
	},
	cause: {
		type: String,
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

module.exports = mongoose.model("emergencies", EmergenciesSchema);

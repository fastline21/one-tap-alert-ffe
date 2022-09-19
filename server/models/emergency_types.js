const mongoose = require("mongoose");

const EmergencyTypesSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
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

module.exports = mongoose.model("emergency_types", EmergencyTypesSchema);

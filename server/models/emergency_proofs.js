const mongoose = require('mongoose');

const EmergencyProofsSchema = mongoose.Schema({
  user_id: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: 'users',
  },
  emergency_id: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: 'Emergencies',
  },
  emergency_category_id: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: 'Emergency_Categories',
  },
  file: {
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

module.exports = mongoose.model('emergency_proofs', EmergencyProofsSchema);

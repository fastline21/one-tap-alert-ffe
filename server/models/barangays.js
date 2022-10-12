const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;

const BarangaysSchema = mongoose.Schema({
  user_id: {
    type: ObjectId,
    required: true,
    ref: 'users',
  },
  district_number: {
    type: Number,
    // required: true,
  },
  district_code: {
    type: String,
    // required: true,
  },
  name: {
    type: String,
    required: true,
  },
  contact_person_id: {
    type: ObjectId,
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

module.exports = mongoose.model('barangays', BarangaysSchema);

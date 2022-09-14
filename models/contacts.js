const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;

const ContactsSchema = mongoose.Schema({
  user_id: {
    type: ObjectId,
    required: true,
  },
  own_table_name: {
    type: String,
    required: true,
  },
  own_primary_key: {
    type: ObjectId,
    required: true,
  },
  contact_type_id: {
    type: ObjectId,
    required: true,
    ref: 'contact_types',
  },
  address_1: {
    type: String,
  },
  address_2: {
    type: String,
  },
  barangay_id: {
    type: ObjectId,
    ref: 'barangays',
  },
  phone_number: {
    type: Number,
  },
  email_address: {
    type: String,
  },
  zip_code: {
    type: Number,
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

module.exports = mongoose.model('contacts', ContactsSchema);

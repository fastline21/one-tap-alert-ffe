const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;

const ContactPersonsSchema = mongoose.Schema({
  user_id: {
    type: ObjectId,
    required: true,
    ref: 'users',
  },
  own_table_name: {
    type: String,
    required: true,
  },
  own_primary_key: {
    type: ObjectId,
    required: true,
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

module.exports = mongoose.model('contact_persons', ContactPersonsSchema);

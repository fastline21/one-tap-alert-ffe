const mongoose = require('mongoose');

const ContactTypesSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  tag: {
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

module.exports = mongoose.model('contact_types', ContactTypesSchema);

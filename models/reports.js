const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;

const ReportsSchema = mongoose.Schema({
  user_id: {
    type: ObjectId,
    required: true,
  },
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
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

module.exports = mongoose.model('reports', ReportsSchema);

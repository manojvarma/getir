const mongoose = require('mongoose');

const recordSchema = mongoose.Schema(
  {
    key: {
      type: String,
    },
    value: {
        type: String,
    },
    counts: [{
      type: Number,
    }],
    createdAt: {
      type: Date
    },
  },
  {}
);

/**
 * @typedef Record
 */
const Record = mongoose.model('Record', recordSchema);

module.exports = Record;
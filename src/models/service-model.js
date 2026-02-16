const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  icon: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: [true, 'title must be provided'],
    trim: true,
  },
  desc: {
    type: String,
    required: [true, 'description must be provided'],
    trim: true,
    maxlength: [200, 'description must be 200 characters or less'],
  }
});

module.exports = mongoose.model('Service', ServiceSchema);

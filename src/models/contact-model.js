
const Contact = require('../models/contact-model');
const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  responded: {
    type:Boolean,
    default: false
  }
});

module.exports = mongoose.model('contact', ContactSchema)
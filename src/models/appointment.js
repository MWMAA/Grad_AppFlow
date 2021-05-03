const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
  user: {
    type: 'ObjectId',
    ref: 'user',
    required: true
  },
  salon: {
    type: 'ObjectId',
    ref: 'salon',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  services: [{
    type: String,
    required: true,
  }],
  review: {
    stars: Number,
    comment: String,
    date: Date,
  },
}, {
  timestamps: true
})

const Appointment = mongoose.model('appointment', appointmentSchema)

module.exports = Appointment
const mongoose = require('mongoose')
const validate = require('validator')
const Appointment = require('./appointment')

const salonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  owner: {
    type: 'ObjectId',
    ref: 'user',
    required: true
  },
  address: {
    country: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    building_number: { type: Number, required: true },
    apartment_number: Number,
    // Google maps coords
    location: { latitude: Number, Logtitude: Number }
  },
  contact_Info: {
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validate.isEmail(value)) {
          throw new Error('Email isnt valid')
        }
      }
    },
    landline: Number,
    mobile: [{ type: Number, required: true }]
  },
  services: [{
    name: { type: String, required: true },
    cost: { type: Number, required: true },
    description: { type: String }
  }],
  about: String,
  open_hrs: {
    starting_hour: { type: Number, required: true },
    closing_hour: { type: Number, required: true }
  },
}, {
  timestamps: true
})

salonSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()

  delete userObject.owner

  return userObject
}

salonSchema.virtual('appointment', {
  ref: 'appointment',
  localField: '_id',
  foreignField: 'salon'
})

// salonSchema.virtual('reviews', {
//   ref: 'salon',
//   localField: '',
//   foreignField: 'review'
// })

// Delete salon appointments when salon is removed
salonSchema.pre('remove', async function (next) {
  const salon = this
  await Appointment.deleteMany({ salon_id: salon._id })
  next()
})

const Salon = mongoose.model('salon', salonSchema)

module.exports = Salon
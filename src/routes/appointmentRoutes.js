const Appointment = require('../models/appointment')
const Salon = require('../models/salon')
const catchAsync = require('../utils/catchAsync')
const { sendAppointmentApprovalEmail, sendAppointmentCancellationEmail, sendAppointmentUpdateEmail, sendBadReviewEmail } = require('../emails/appointment')

exports.createAppointment = catchAsync(async (req, res, next) => {
  const appointment = new Appointment({
    ...req.body,
    user: req.user,
    salon: await Salon.findOne({ _id: req.body.salon })
  })

  const servicesArray = []
  for (i in salon.services) {
    servicesArray.concat(salon.services.name)
  }

  for (i in appointment.services) {
    if (!servicesArray.includes(i)) return res.status(400).send({ error: "Invalid services!" });
  }

  await appointment.save()
  sendAppointmentApprovalEmail(appointment.user.email)
  res.status(201).send(appointment)
})

// Read Appointment
// GET/ appointments?completed=true
// GET/ appointments?limit=3&skip=3
// GET/ appointments?sortBy=createdAt:asc
exports.readAppointments = catchAsync(async (req, res, next) => {
  const match = {}
  const sort = {}

  if (req.query.completed) {
    match.completed = req.query.completed === 'true'
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':')
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
  }

  const appointments = await Appointment.find({}, {
    // limit: parseInt(req.query.limit),
    // skip: parseInt(req.query.skip),
    // sort
  });

  res.send(appointments)
})

// Read Appointment
exports.readAppointment = catchAsync(async (req, res, next) => {
  const _id = req.params.id

  const appointment = await Appointment.findOne({
    _id
  })

  if (!appointment) {
    return res.status(404).send()
  }
  res.send(appointment)
})

// Update Appointment
exports.updateAppointment = catchAsync(async (req, res, next) => {
  const update = Object.keys(req.body)
  const allowedUpdats = ['services', 'date']
  const isValidOperation = update.every((update) => allowedUpdats.includes(update))

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" })
  }

  const appointment = await Appointment.findOne({
    _id: req.params.id
  })

  appointment.user = req.user
  appointment.salon = await Salon.findOne({ _id: appointment.salon })

  if (!appointment) {
    return res.status(404).send()
  }

  update.forEach((updates) => appointment[updates] = req.body[updates])
  await appointment.save()
  sendAppointmentUpdateEmail(appointment.user.email)
  res.send(appointment)
})

// Delete Appointment
exports.deleteAppointment = catchAsync(async (req, res, next) => {
  const appointment = await Appointment.findOneAndDelete({
    _id: req.params.id
  })

  appointment.user = req.user
  appointment.salon = await Salon.findOne({ _id: appointment.salon })

  if (!appointment) {
    res.status(404).send()
  }

  sendAppointmentCancellationEmail(appointment.user.email)
  res.send()
})

// Create Review
exports.createReview = catchAsync(async (req, res, next) => {
  const appointment = await Appointment.findOne({
    _id: req.params.id
  })

  await appointment.updateOne({
    review: {
      stars: req.body.stars,
      comment: req.body.comment,
    }
  })

  if (req.body.star < 2) {
    sendBadReviewEmail(appointment.user.email, appointment.user.name, req.body.stars)
  }
  res.status(200).send()
})

exports.completeAppointment = catchAsync(async (req, res, next) => {
  const _id = req.params.id
  const appointment = await Appointment.findOne({
    _id
  })
  
  if (!appointment) {
    return res.status(404).send()
  }

  await appointment.updateOne({ completed: true })
  res.status(200).send()
})
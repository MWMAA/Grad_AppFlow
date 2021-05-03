const Salon = require('../models/salon')
const User = require('../models/user')
const { sendSalonCreationEmail, sendSalonDeletionEmail } = require('../emails/salon')
const catchAsync = require('../utils/catchAsync')

// Create Salon
exports.createSalon = catchAsync(async (req, res, next) => {
  const salon = new Salon({
    ...req.body,
    owner: req.user
  })

  const user = await User.findById(salon.owner)

  await salon.save()
  await user.updateOne({ roles: "owner" })
  await sendSalonCreationEmail(salon.contact_Info.email, salon.name)
  res.status(201).send(salon)
})

// Read Salon
// GET/ salons?limit=3&skip=3
// GET/ salons?sortBy=createdAt:asc
exports.readSalons = catchAsync(async (req, res, next) => {
  const sort = {}

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':')
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
  }

  const salons = await Salon.find({}, {
    // limit: parseInt(req.query.limit),
    // skip: parseInt(req.query.skip),
    // sort
  });
  res.send(salons)
})

// Read Salon
exports.readSalon = catchAsync(async (req, res, next) => {
  const _id = req.params.id
  const salon = await Salon.findOne({ _id })

  if (!salon) {
    return res.status(404).send(salon)
  }
  res.send(salon)
})

// Update Salon
exports.UpdateSalon = catchAsync(async (req, res, next) => {
  const update = Object.keys(req.body)
  const allowedUpdats = ['services', 'contact_Info', 'about', 'open_hrs', 'contact_Info', 'address', 'name']
  const isValidOperation = update.every((update) => allowedUpdats.includes(update))

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" })
  }

  const salon = await Salon.findOne({ _id: req.params.id })

  if (!salon) {
    return res.status(404).send()
  }

  update.forEach((updates) => salon[updates] = req.body[updates])
  await salon.save()
  res.send(salon)
})

// Delete Salon
exports.DeleteSalon = catchAsync(async (req, res, next) => {
  const salon = await Salon.findOneAndDelete({ _id: req.params.id })

  if (!salon) {
    res.status(404).send()
  }

  await sendSalonDeletionEmail(salon.contact_Info.email, salon.name)
  await req.user.updateOne({ roles: "user" })
  next();
})
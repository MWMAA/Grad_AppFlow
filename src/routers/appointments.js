const express = require('express')
const { auth, restrictTo } = require('../middleware/auth')
const router = new express.Router()
const appointmentRoutes = require('../routes/appointmentRoutes')

router
  .route('/appointments')
  .post(auth, appointmentRoutes.createAppointment)
  .get(auth, appointmentRoutes.readAppointments)

router
  .route('/appointments/:id')
  .get(auth, appointmentRoutes.readAppointment)
  .patch(auth, appointmentRoutes.updateAppointment)
  .delete(auth, appointmentRoutes.deleteAppointment)

router
  .route('/reviews/appointments/:id')
  .post(auth, appointmentRoutes.createReview)

router
  .route('/completeAppointment/:id')
  .post(auth, appointmentRoutes.completeAppointment)

module.exports = router
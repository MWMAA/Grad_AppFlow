const express = require('express')
const { auth, restrictTo } = require('../middleware/auth')
const router = new express.Router()
const salonRoutes = require('../routes/salonRoutes')

router
  .route('/salons')
  .post(auth, salonRoutes.createSalon)
  .get(auth, salonRoutes.readSalons)

router
  .route('/salons/:id')
  .get(auth, salonRoutes.readSalon)
  .patch(auth, restrictTo('owner', "admin"), salonRoutes.UpdateSalon)
  .delete(auth, restrictTo('owner', "admin"), salonRoutes.DeleteSalon)

module.exports = router
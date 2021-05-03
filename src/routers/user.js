const express = require('express')
const { auth } = require('../middleware/auth')
const userRoutes = require('../routes/userRoutes')
const router = new express.Router()

router.post('/SignUp', userRoutes.SignUp);
router.post('/LogIn', userRoutes.LogIn)
router.post('/forgotPassword', userRoutes.forgotPassword)
router.patch('/resetPassword/:token', userRoutes.resetPassword)
router.patch('/updatePassword', auth, userRoutes.updatePassword)

router
  .route('/users/me')
  .get(auth, userRoutes.readUser)
  .patch(
    auth,
    userRoutes.uploadUserAvatar,
    userRoutes.resizeUserPhoto,
    userRoutes.updateUser
  )
  .delete(auth, userRoutes.deleteUser)

module.exports = router
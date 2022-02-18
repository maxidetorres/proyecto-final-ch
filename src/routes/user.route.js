const express = require('express')
const passport = require('passport')
const router = express.Router()

const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'userImages')
  },
  filename: function (req, file, cb) {
    cb(null, `${req.body.email}.${file.mimetype.split('/')[1]}`)
  }
})
const upload = multer({ storage: storage })
/* const uploadImages = require('../middleware/upload-image.middleware') */
const userController = require('../controller/user.controller')

router.get('/login', (req, res) => {
  res.render('login', { title: 'Login' })
})
router.get('/loginfail', (req, res) => {
  res.json(403, { message: 'Invalid username/password' })
})

/* router.post('/login', passport.authenticate('local', { failureRedirect: '/login-failure', successRedirect: 'login-success' })) */
router.post('/login', passport.authenticate('local', { failureRedirect: '/api/user/loginfail', failureFlash: false }), userController.login)
router.post('/register', upload.single('profileImage'), userController.register)
/* router.post('/login', userController.login) */

module.exports = router

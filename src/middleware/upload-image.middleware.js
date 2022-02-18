const multer = require('multer')
/* const upload = multer({ dest: 'userImages/' }); */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, `${req.body.email}`)
  }
})
const upload = multer({ storage: storage })

module.exports = async (req, res, next) => {
  console.log(req)

  if (req.file) {
    upload.single('miArchivo')
  }

  next()
}

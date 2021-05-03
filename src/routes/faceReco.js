const axios = require('axios');
const multer = require('multer');
const catchAsync = require('../utils/catchAsync');
// const image = require('../../dev-data/imgs/selena.jpg')

const image = multer({
  // storage: multer.memoryStorage(),
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('please insert a picture'))
    }

    cb(undefined, true)
  }
})

exports.uploadPhoto = image.single('image');

exports.faceReco = catchAsync(async (req, res, next) => {
  // req.file ? res.send("yes") : res.send("no")

  resp = await axios.post("http://127.0.0.1:5000/store/recommend", {
    image: req.file
  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    })

  res.status(200).send(resp)
})
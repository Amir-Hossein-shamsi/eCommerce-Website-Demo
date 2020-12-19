import express from 'express'
import path from 'path'
import multer from 'multer'
const router = express.Router()

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, '/Upload')
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}--${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

const checkfilemulterr = (file, cb) => {
  const filetype = /jpg|jpeg|png/
  const extname = filetype.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetype.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('please upload an image with jpg, jpeg or png format ')
  }
}

const uplaod = multer({
  storage,
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    checkfilemulterr(file, cb)
  },
})

router.post('/', uplaod.single('image'), (req, res) => {
  res.send(`/${req.file.path}`)
})

export default router

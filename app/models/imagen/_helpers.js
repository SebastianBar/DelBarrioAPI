import { v4 as uuid } from 'uuid'
import multer from 'multer'
import path from 'path'
import fs from 'fs'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/')
  },
  filename: (req, file, cb) => {
    cb(null, uuid() + '.' + (/(?:\.([^.]+))?$/).exec(file.originalname)[1])
  }
})

const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png/
  const mimetype = filetypes.test(file.mimetype)
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  
  if (mimetype && extname) {
    return cb(null, true)
  }
  cb({message: 'File upload only supports the following filetypes - ' + filetypes})
}

const upload = multer({ storage: storage, fileFilter: fileFilter }).fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 4 }])

const deleteFiles = files => {
  Object.keys(files).forEach(key => {
    files[key].forEach(file => {
      fs.unlink(file.destination + file.filename, err => { 
        if(err) {
          throw err
        }
      })
    })
  })
}

const deleteFile = path => {
  fs.unlink(path, err => { 
    if(err) {
      // Do nothing
    }
  })
}

const errorHandling = {
  EmprendedorUniqueConstraintError: err => {
    if (!err) return false
    const re = /^req_imagenes_iden_emprendedor_unique/
    return re.test(err.constraint)
  }
}

/* Se exportan los métodos */
module.exports = {
  upload,
  deleteFiles,
  deleteFile,
  errorHandling
}

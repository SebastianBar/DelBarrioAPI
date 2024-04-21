import { v4 as uuid } from 'uuid';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/');
  },
  filename: (req, file, cb) => {
    cb(null, `${uuid()}.${(/(?:\.([^.]+))?$/).exec(file.originalname)[1]}`);
  },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb({ message: `File upload only supports the following filetypes - ${filetypes}` });
  }
};

export const upload = multer({ storage, fileFilter }).fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 4 }]);

export const deleteFiles = (files) => {
  Object.keys(files).forEach((key) => {
    files[key].forEach((file) => {
      fs.unlink(file.destination + file.filename, (err) => {
        if (err) {
          throw err;
        }
      });
    });
  });
};

export const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      // Do nothing
    }
  });
};

export const errorHandling = {
  EmprendedorUniqueConstraintError: (err) => {
    if (!err) return false;
    return err.constraint.startsWith('req_imagenes_iden_emprendedor_unique');
  },
};

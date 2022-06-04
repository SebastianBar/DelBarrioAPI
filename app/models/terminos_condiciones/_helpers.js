import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/');
  },
  filename: (req, file, cb) => {
    cb(null, `${new Date().getTime()}.pdf`);
  },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /pdf/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb({ message: `File upload only supports the following filetypes - ${filetypes}` });
  }
};

export const upload = multer({ storage, fileFilter }).single('TERMINOS_CONDICIONES');

export const renameOldFile = () => {
  fs.rename('public/TERMINOS_CONDICIONES.pdf', `public/TERMINOS_CONDICIONES_${new Date().getTime()}.pdf`, (err) => {
    if (err) {
      // Do nothing, file doesn't seems to exist
    }
  });
};

export const renameNewFile = (file) => {
  fs.rename(file.path, 'public/TERMINOS_CONDICIONES.pdf', (err) => {
    if (err) {
      // Do nothing, file doesn't seems to exist
    }
  });
};

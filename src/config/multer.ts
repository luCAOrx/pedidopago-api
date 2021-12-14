import crypto from 'crypto';
import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';

const doisMB = 2 * 1024 * 1024;

const tiposArmazenados = {
  local: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads'),
    filename(request, file: Express.Multer.File, callback) {
      const hash = crypto.randomBytes(6).toString('hex');

      file.filename = `${hash}-${file.originalname}`;

      callback(null, file.filename);
    },
  }),
};

export const multerConfig = {
  destination: path.resolve(__dirname, '..', '..', 'uploads'),
  storage: tiposArmazenados.local,
  limits: {
    fileSize: doisMB,
  },

  fileFilter(request: Request, file: Express.Multer.File, callback: FileFilterCallback) {
    const allowedMimes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'image/jpg',
    ];

    if (allowedMimes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(null, false);
      callback(new Error('Tipo de arquivo inválido.'));
    }
  },
};
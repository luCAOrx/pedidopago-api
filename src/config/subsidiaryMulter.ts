import aws from 'aws-sdk';
import crypto from 'crypto';
import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';

const twoMB = 2 * 1024 * 1024;

const storageTypes = {
  local: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads', 'subsidiary'),
    filename(request, file: Express.MulterS3.File, callback) {
      const hash = crypto.randomBytes(6).toString('hex');

      file.key = `${hash}-${file.originalname}`;

      callback(null, file.key);
    },
  }),
  s3: multerS3({
    s3: new aws.S3({
      credentials: {
        accessKeyId: String(process.env.AWS_SUBSIDIARY_ACCESS_KEY_ID),
        secretAccessKey: String(process.env.AWS_SUBSIDIARY_SECRET_ACCESS_KEY)
      },
      region: process.env.AWS_SUBSIDIARY_DEFAULT_REGION
    }),
    bucket: String(process.env.AWS_SUBSIDIARY_BUCKET_NAME),
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (request, file: Express.MulterS3.File, callback) => {
      const hash = crypto.randomBytes(6).toString('hex');

      const fileName = `${hash}-${file.originalname}`;

      callback(null, fileName);
    },
  }),
};

export const subsidiaryMulterConfig = {
  destination: path.resolve(__dirname, '..', '..', 'uploads', 'subsidiary'),
  storage: process.env.STORAGE_TYPE === 'local' ? storageTypes.local : storageTypes.s3,
  limits: {
    fileSize: twoMB,
  },

  fileFilter(request: Request, file: Express.MulterS3.File, callback: FileFilterCallback) {
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
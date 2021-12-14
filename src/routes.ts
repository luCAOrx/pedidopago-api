import { Router } from "express";
import multer from "multer";

import { multerConfig } from './config/multer';

import { 
  createPharmacy, 
  deletePharmacy, 
  getAllPharmacys, 
  getPharmacyByName, 
  updatePharmacyData
} from './controllers/PharmacyController';

import { 
  createSubsidiary, 
  deleteSubsidiary, 
  getAllSubsidiarys, 
  getSubsidiaryByName,
  updateSubsidiaryData
} from "./controllers/SubsidiaryController";

const routes = Router();

const upload = multer(multerConfig);

routes.post('/createPharmacy', upload.single('logo'), createPharmacy);

routes.get('/getPharmacyByName', getPharmacyByName);

routes.get('/getAllPharmacys', getAllPharmacys);

routes.put('/updatePharmacyData/:id', upload.single('logo'), updatePharmacyData);

routes.delete('/deletePharmacy/:id', deletePharmacy);

routes.post('/createSubsidiary/:farmacia_id', upload.single('logo'), createSubsidiary);

routes.get('/getSubsidiaryByName', getSubsidiaryByName);

routes.get('/getAllSubsidiarys', getAllSubsidiarys);

routes.put('/updateSubsidiaryData/:id', upload.single('logo'), updateSubsidiaryData);

routes.delete('/deleteSubsidiary/:id', deleteSubsidiary);

export { routes };
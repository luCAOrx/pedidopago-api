import { Router } from "express";
import multer from "multer";

import { subsidiaryMulterConfig } from './config/subsidiaryMulter';

import { pharmacyMulterConfig } from './config/pharmacyMulter';

import { productMulterConfig } from './config/productMulter';

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

import { 
  cloneProduct, 
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductsByName,
  updateProductData
} from "./controllers/ProductController";

const routes = Router();

const pharmacyUpload = multer(pharmacyMulterConfig);

const subsidiaryUpload = multer(subsidiaryMulterConfig);

const productUpload = multer(productMulterConfig);

routes.post('/createPharmacy', pharmacyUpload.single('logo'), createPharmacy);

routes.get('/getPharmacyByName', getPharmacyByName);

routes.get('/getAllPharmacys', getAllPharmacys);

routes.put('/updatePharmacyData/:id', pharmacyUpload.single('logo'), updatePharmacyData);

routes.delete('/deletePharmacy/:id', deletePharmacy);

routes.post('/createSubsidiary/:farmacia_id', subsidiaryUpload.single('logo'), createSubsidiary);

routes.get('/getSubsidiaryByName', getSubsidiaryByName);

routes.get('/getAllSubsidiarys', getAllSubsidiarys);

routes.put('/updateSubsidiaryData/:id', subsidiaryUpload.single('logo'), updateSubsidiaryData);

routes.delete('/deleteSubsidiary/:id', deleteSubsidiary);

routes.post('/createProduct', productUpload.single('thumbnail'), createProduct)

routes.post('/cloneProduct/:id', cloneProduct);

routes.get('/getProductsByName', getProductsByName);

routes.get('/getAllProducts', getAllProducts);

routes.put('/updateProductData/:id', productUpload.single('thumbnail'), updateProductData);

routes.delete('/deleteProduct/:id', deleteProduct);

export { routes };
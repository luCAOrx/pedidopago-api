import { credentials, loadPackageDefinition } from '@grpc/grpc-js';

import { loadSync } from '@grpc/proto-loader';

import path from 'path';

import { config } from '../config/proto';

const pharmacyPath = path.resolve(__dirname, '..', 'proto', 'pharmacy.proto');

const packageDefinition = loadSync(pharmacyPath, config);
  
const { pharmacy } = loadPackageDefinition(packageDefinition) as any;

const pharmacyClient = new pharmacy.PharmacyService(
  String(process.env.GRPC_PHARMACY_SERVER_URL),
  credentials.createInsecure()
);

const subsidiaryClient = new pharmacy.SubsidiaryService(
  String(process.env.GRPC_PHARMACY_SERVER_URL),
  credentials.createInsecure()
);

export { pharmacyClient, subsidiaryClient };

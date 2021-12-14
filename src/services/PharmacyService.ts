import { credentials, loadPackageDefinition } from '@grpc/grpc-js';

import { loadSync } from '@grpc/proto-loader';

import path from 'path';

import { config } from '../config/proto';

const pharmacyPath = path.resolve(__dirname, '..', 'proto', 'pharmacy.proto');

const packageDefinition = loadSync(pharmacyPath, config);
  
const { pharmacy } = loadPackageDefinition(packageDefinition) as any;

const pharmacyClient = new pharmacy.PharmacyService(
  'localhost:50051',
  credentials.createInsecure()
);

const SubsidiaryClient = new pharmacy.SubsidiaryService(
  'localhost:50051',
  credentials.createInsecure()
);

export { pharmacyClient, SubsidiaryClient };

import { credentials, loadPackageDefinition } from '@grpc/grpc-js';

import { loadSync } from '@grpc/proto-loader';

import path from 'path';

import { config } from '../config/proto';

const productPath = path.resolve(__dirname, '..', 'proto', 'product.proto');

const packageDefinition = loadSync(productPath, config);
  
const { product } = loadPackageDefinition(packageDefinition) as any;

const productClient = new product.ProductService(
  'localhost:50052',
  credentials.createInsecure()
);

export { productClient };

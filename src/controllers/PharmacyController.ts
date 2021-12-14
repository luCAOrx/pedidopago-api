import { Request, Response } from 'express';

import { pharmacyClient } from '../services/PharmacyService';

import { promisify } from 'util';
import fileSystem from 'fs';
import path from 'path';

export async function createPharmacy(request: Request, response: Response) {
  const {
    nome,
    cnpj,
    endereco,
    horarioDeFuncionamento,
    responsavel,
    telefone,
    outros,
  } = request.body;

  const { filename: logo } = request.file as Express.Multer.File;

  const pharmacyResponse = await new Promise((resolve, reject) => {
    pharmacyClient.createPharmacy({ pharmacy: {
      logo,
      nome,
      cnpj,
      endereco,
      horarioDeFuncionamento,
      responsavel,
      telefone,
      outros,
    }}, (error: any, data: any) => {
      if (error) {
        promisify(fileSystem.unlink)(path.resolve(
          __dirname, '..', '..', `uploads/${logo}`,
        ));
    
        return response.status(400).json({ error: error.details });
      } else {
        resolve(data);
      }
    });
  });

  return response.status(201).json(pharmacyResponse);
};

export async function getPharmacyByName(request: Request, response: Response) {
  const { nome, page } = request.query;

  const pharmacyResponse = await new Promise((resolve, reject) => {
    pharmacyClient.getPharmacyByName({ nome, page }, (error: any, data: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });

  return response.status(200).json(pharmacyResponse); 
};

export async function getAllPharmacys(request: Request, response: Response) {
  const pharmacyResponse = await new Promise((resolve, reject) => {
    pharmacyClient.getAllPharmacys({}, (error: any, data: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });

  return response.status(200).json(pharmacyResponse); 
};

export async function updatePharmacyData(request: Request, response: Response) {
  const { id } = request.params;

  const {
    nome,
    endereco,
    horarioDeFuncionamento,
    responsavel,
    telefone,
    outros,
  } = request.body;

  const { filename: logo } = request.file as Express.Multer.File;

  const pharmacyResponse = await new Promise((resolve, reject) => {
    pharmacyClient.updatePharmacyData({pharmacy: {
      id,
      logo,
      nome,
      endereco,
      horarioDeFuncionamento,
      responsavel,
      telefone,
      outros,
    }}, (error: any, data: any) => {
      if (error) {
        promisify(fileSystem.unlink)(path.resolve(
          __dirname, '..', '..', `uploads/${logo}`,
        ));
    
        return response.status(400).json({ error: error.details });
      } else {
        resolve(data);
      }
    });
  });

  return response.status(201).json(pharmacyResponse);
};

export async function deletePharmacy(request: Request, response: Response) {
  const { id } = request.params;

  await new Promise((resolve, reject) => {
    pharmacyClient.deletePharmacy({id}, (error: any, data: any) => {
      if (error) {
        return response.status(400).json({ error: error.details });
      } else {
        resolve(data);
        return response.status(200).send();
      }
    });
  });
};
import { Request, Response } from 'express';

import { pharmacyClient } from '../services/PharmacyService';

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

  const { key: logo } = request.file as Express.MulterS3.File;

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
  const { page } = request.query;

  const pharmacyResponse = await new Promise((resolve, reject) => {
    pharmacyClient.getAllPharmacys({ page }, (error: any, data: any) => {
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

  const { key: logo } = request.file as Express.MulterS3.File;

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
      }
    });
  });

  return response.status(204).send();
};
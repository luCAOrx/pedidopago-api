import { Request, Response } from "express";

import { subsidiaryClient } from "../services/PharmacyService";

import { promisify } from 'util';
import fileSystem from 'fs';
import path from 'path';

export async function createSubsidiary(request: Request, response: Response) {
  const { farmacia_id } = request.params;

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

  const SubsidiaryResponse = await new Promise((resolve, reject) => {
    subsidiaryClient.createSubsidiary({subsidiary: {
      logo,
      nome,
      cnpj,
      endereco,
      horarioDeFuncionamento,
      responsavel,
      telefone,
      outros,
      farmacia_id
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

  return response.status(201).json(SubsidiaryResponse);
}

export async function getSubsidiaryByName(request: Request, response: Response) {
  const { nome, page } = request.query;

  const subsidiarys = await new Promise((resolve, reject) => {
    subsidiaryClient.getSubsidiaryByName({ nome, page }, (error: any, data: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });

  return response.status(200).json(subsidiarys); 
};

export async function getAllSubsidiarys(request: Request, response: Response) {
  const subsidiaryResponse = await new Promise((resolve, reject) => {
    subsidiaryClient.getAllSubsidiarys({}, (error: any, data: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });

  return response.status(200).json(subsidiaryResponse); 
};

export async function updateSubsidiaryData(request: Request, response: Response) {
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

  const subsidiaryResponse = await new Promise((resolve, reject) => {
    subsidiaryClient.updateSubsidiaryData({subsidiary: {
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

  return response.status(201).json(subsidiaryResponse);
};

export async function deleteSubsidiary(request: Request, response: Response) {
  const { id } = request.params;

  await new Promise((resolve, reject) => {
    subsidiaryClient.deleteSubsidiary({id}, (error: any, data: any) => {
      if (error) {
        return response.status(400).json({ error: error.details });
      } else {
        resolve(data);
        return response.status(200).send();
      }
    });
  });
};
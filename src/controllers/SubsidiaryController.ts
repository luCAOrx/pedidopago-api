import { Request, Response } from "express";

import { SubsidiaryClient } from "../services/PharmacyService";

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
    SubsidiaryClient.createSubsidiary({subsidiary: {
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

export async function getSubsidiaryByNameAndCNPJ(request: Request, response: Response) {
  const { nome, cnpj } = request.query;

  const subsidiaryResponse = await new Promise((resolve, reject) => {
    SubsidiaryClient.getSubsidiaryByNameAndCNPJ({ nome, cnpj }, (error: any, data: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });

  return response.status(200).json(subsidiaryResponse); 
};

export async function getAllSubsidiarys(request: Request, response: Response) {
  const pharmacyResponse = await new Promise((resolve, reject) => {
    SubsidiaryClient.getAllSubsidiarys({}, (error: any, data: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });

  return response.status(200).json(pharmacyResponse); 
};

export async function updateSubsidiaryData(request: Request, response: Response) {
  const { id } = request.params;

  const {
    nome,
    cnpj,
    endereco,
    horarioDeFuncionamento,
    responsavel,
    telefone,
    outros,
  } = request.body;

  const logo = request.file?.filename;

  const subsidiaryResponse = await new Promise((resolve, reject) => {
    SubsidiaryClient.updateSubsidiaryData({
      id,
      logo,
      nome,
      cnpj,
      endereco,
      horarioDeFuncionamento,
      responsavel,
      telefone,
      outros,
    }, (error: any, data: any) => {
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
}

export async function deleteSubsidiary(request: Request, response: Response) {
  const { id } = request.params;

  await new Promise((resolve, reject) => {
    SubsidiaryClient.deleteSubsidiary({id}, (error: any, data: any) => {
      if (error) {
        return response.status(400).json({ error: error.details });
      } else {
        resolve(data);
        return response.status(200).send();
      }
    });
  });
};
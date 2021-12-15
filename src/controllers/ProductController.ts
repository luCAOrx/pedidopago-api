import { Request, Response } from "express";
import { productClient } from "../services/ProductService";

export async function createProduct(request: Request, response: Response) {
  const {
    nome,
    preco,
    ingredientes,
    disponibilidade,
    volume,
    outros
  } = request.body;

  const { filename: thumbnail } = request.file as Express.Multer.File;

  const productResponse = await new Promise((resolve, reject) => {
    productClient.createProduct({product: {
      thumbnail,
      nome,
      preco,
      ingredientes,
      disponibilidade,
      volume,
      outros
    }}, (error: any, data: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });

  return response.status(201).json(productResponse);
};

export async function cloneProduct(request: Request, response: Response) {
  const { id } = request.params;

  const productResponse = await new Promise((resolve, reject) => {
    productClient.cloneProduct({ id }, (error: any, data: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });

  return response.status(201).json(productResponse);
};

export async function getProductsByName(request: Request, response: Response) {
  const { nome, page } = request.query;

  const productResponse = await new Promise((resolve, reject) => {
    productClient.getProductsByName({ nome, page }, (error: any, data: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });

  return response.status(200).json(productResponse);
};

export async function getAllProducts(request: Request, response: Response) {
  const { page } = request.query;

  const productResponse = await new Promise((resolve, reject) => {
    productClient.getAllProducts({ page }, (error: any, data: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });

  return response.status(200).json(productResponse);
};

export async function updateProductData(request: Request, response: Response) {
  const { id } = request.params;

  const {
    nome,
    preco,
    ingredientes,
    disponibilidade,
    volume,
    outros
  } = request.body;

  const { filename: thumbnail } = request.file as Express.Multer.File;

  const productResponse = await new Promise((resolve, reject) => {
    productClient.updateProductData({product: {
      id,
      thumbnail,
      nome,
      preco,
      ingredientes,
      disponibilidade,
      volume,
      outros
    }}, (error: any, data: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });

  return response.status(201).json(productResponse);
};

export async function deleteProduct(request: Request, response: Response) {
  const { id } = request.params;

  await new Promise((resolve, reject) => {
    productClient.deleteProduct({ id }, (error: any, data: any) => {
      if (error) {
        return response.status(400).json({ error: error.details });
      } else {
        resolve(data);
      }
    });
  });
  
  return response.status(204).send();
};
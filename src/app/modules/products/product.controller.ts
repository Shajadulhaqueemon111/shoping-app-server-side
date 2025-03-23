import httpStatus from "http-status";
import { Request, Response } from "express";

import { ProductService } from "./product.service";
import { Product } from "./products.interface";
import sendResponse from "../utils/sendResponse";
import catchAsync from "../utils/catchAsync";

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const productData: Product = req.body;
  const result = await ProductService.createProduct(productData);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Product created successfully",
    data: result,
  });
});

const findProductById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProductService.findProductById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product retrieved successfully",
    data: result,
  });
});

const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.getAllProducts(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Products retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const updateProductById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await ProductService.updateProductById(id, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product updated successfully",
    data: result,
  });
});

const deleteProductById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProductService.deleteProductById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product deleted successfully",
    data: result || null,
  });
});

export const ProductController = {
  createProduct,
  findProductById,
  getAllProducts,
  updateProductById,
  deleteProductById,
};

import express from "express";
import { ProductController } from "./product.controller";

export const router = express.Router();
//will coll controller function
router.post("/create-product", ProductController.createProduct);
router.get("/getAllProduct", ProductController.getAllProducts);
router.get("/:id", ProductController.findProductById);
router.patch("/:id", ProductController.updateProductById);
router.delete("/:id", ProductController.deleteProductById);

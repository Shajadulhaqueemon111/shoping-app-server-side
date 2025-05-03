import express from "express";
import { ProductController } from "./product.controller";
import validateRequest from "../../middlewares/validateRequiest";
import { productZodValidationSchema } from "./product.validation";

const router = express.Router();
//will coll controller function
router.post(
  "/create-product",
  validateRequest(productZodValidationSchema.createProductValidationSchema),
  ProductController.createProduct
);
router.get("/", ProductController.getAllProducts);
router.get("/:id", ProductController.findProductById);
router.patch(
  "/:id",
  validateRequest(productZodValidationSchema.updatedProductValidationSchema),
  ProductController.updateProductById
);
router.delete("/:id", ProductController.deleteProductById);

export const productRouter = router;

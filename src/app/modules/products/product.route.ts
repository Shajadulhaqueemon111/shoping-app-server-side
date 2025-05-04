import express from "express";
import { ProductController } from "./product.controller";
import validateRequest from "../../middlewares/validateRequiest";
import { productZodValidationSchema } from "./product.validation";
import authValidateRequest from "../../middlewares/authValidationRequest";
import { USER_ROLE } from "../User/user.contsnt";

const router = express.Router();
//will coll controller function
router.post(
  "/create-product",
  validateRequest(productZodValidationSchema.createProductValidationSchema),
  ProductController.createProduct
);
router.get(
  "/",
  authValidateRequest(USER_ROLE.admin),
  ProductController.getAllProducts
);
router.get(
  "/:id",
  authValidateRequest(USER_ROLE.admin),
  authValidateRequest(USER_ROLE.admin),
  ProductController.findProductById
);
router.patch(
  "/:id",
  authValidateRequest(USER_ROLE.admin),
  validateRequest(productZodValidationSchema.updatedProductValidationSchema),
  ProductController.updateProductById
);
router.delete(
  "/:id",
  authValidateRequest(USER_ROLE.admin),
  ProductController.deleteProductById
);

export const productRouter = router;

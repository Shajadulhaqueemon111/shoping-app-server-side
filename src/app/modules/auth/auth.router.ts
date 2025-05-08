import express from "express";
import { authController } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequiest";
import { loginZodValidationSchema } from "./auth.validation";
const router = express.Router();

router.post(
  "/login",
  validateRequest(loginZodValidationSchema.loginValidationSchema),
  authController.loginUser
);
router.post(
  "/refresh-token",
  validateRequest(loginZodValidationSchema.refreshTokenValidationSchema),
  authController.loginUser
);

export const LoginRouetr = router;

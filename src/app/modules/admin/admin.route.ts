import express from "express";
import { adminController } from "./admin.controller";
import validateRequest from "../../middlewares/validateRequiest";
import { adminZodValidationSchema } from "./admin.validation";
import authValidateRequest from "../../middlewares/authValidationRequest";
import { USER_ROLE } from "../User/user.contsnt";

const router = express.Router();

router.get(
  "/",
  authValidateRequest(USER_ROLE.admin),
  adminController.getAllAdmin
);

router.get(
  "/:id",
  authValidateRequest(USER_ROLE.admin),
  adminController.getSingleAdmin
);
router.patch(
  "/:id",
  authValidateRequest(USER_ROLE.admin),
  validateRequest(adminZodValidationSchema.updateAdminValidationSchema),
  adminController.updateAdmin
);

export const AdminRouter = router;

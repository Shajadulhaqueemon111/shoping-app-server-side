import express from "express";

import { UserController } from "./user.controller";

import {
  createUserValidationSchema,
  updateUserValidationSchema,
} from "./user.validation";
import validateRequest from "../../middlewares/validateRequiest";
import { adminZodValidationSchema } from "../admin/admin.validation";
import authValidateRequest from "../../middlewares/authValidationRequest";
import { USER_ROLE } from "./user.contsnt";

const router = express.Router();

router.post(
  "/create-user",

  validateRequest(createUserValidationSchema),
  UserController.createUser
);

router.get(
  "/:id",
  authValidateRequest(USER_ROLE.admin, USER_ROLE.user),
  UserController.getSingleUser
);

router.patch(
  "/:id",
  authValidateRequest(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(updateUserValidationSchema),
  UserController.updateUserById
);

router.post(
  "/create-admin",

  validateRequest(adminZodValidationSchema.createAdminValidationSchema),
  UserController.createAdmin
);
// router.delete("/:id", auth(USER_ROLE.admin), UserController.deleteUserById);
router.delete("/:id", UserController.deleteUserById);

export const UserRoutes = router;

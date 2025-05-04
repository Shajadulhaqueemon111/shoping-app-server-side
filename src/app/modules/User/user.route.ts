import express, { NextFunction, Request, Response } from "express";

import { UserController } from "./user.controller";

import {
  createUserValidationSchema,
  updateUserValidationSchema,
} from "./user.validation";
import validateRequest from "../../middlewares/validateRequiest";
import { adminZodValidationSchema } from "../admin/admin.validation";
import authValidateRequest from "../../middlewares/authValidationRequest";
import { USER_ROLE } from "./user.contsnt";
import { upload } from "../utils/sendImageToCloudinary";

const router = express.Router();

router.post(
  "/create-user",
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    console.log("After parse:", req.body);
    next();
  },
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

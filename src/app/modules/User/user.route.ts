import express from "express";

import { UserController } from "./user.controller";

// import auth from "../../middlewares/auth";
// import { USER_ROLE } from "./user.utils";
import {
  createUserValidationSchema,
  updateUserValidationSchema,
} from "./user.validation";
import validateRequest from "../../middlewares/validateRequiest";

const router = express.Router();

router.post(
  "/create-user",
  // auth(USER_ROLE.admin),
  validateRequest(createUserValidationSchema),
  UserController.createUser
);

router.get(
  "/:id",
  // auth(USER_ROLE.admin, USER_ROLE.user),
  UserController.getSingleUser
);

router.patch(
  "/:id",
  // auth(USER_ROLE.admin),
  validateRequest(updateUserValidationSchema),
  UserController.updateUserById
);

// router.delete("/:id", auth(USER_ROLE.admin), UserController.deleteUserById);
router.delete("/:id", UserController.deleteUserById);

export const UserRoutes = router;

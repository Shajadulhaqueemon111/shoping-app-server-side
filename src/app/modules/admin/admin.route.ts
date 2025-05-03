import express from "express";
import { adminController } from "./admin.controller";
import validateRequest from "../../middlewares/validateRequiest";
import { adminZodValidationSchema } from "./admin.validation";

const router = express.Router();

router.get("/", adminController.getAllAdmin);

router.get("/:id", adminController.getSingleAdmin);
router.patch(
  "/:id",
  validateRequest(adminZodValidationSchema.updateAdminValidationSchema),
  adminController.updateAdmin
);

export const AdminRouter = router;

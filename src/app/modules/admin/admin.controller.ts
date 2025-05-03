import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import { adminService } from "./admin.service";
import httpStatus from "http-status";
const getAllAdmin = catchAsync(async (req, res) => {
  const result = await adminService.getAllAdminIntoDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Get all admin data is successfully",
    data: result,
  });
});
const getSingleAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await adminService.getSingleAdminIntoDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Get Single admin data is successfully",
    data: result,
  });
});
const updateAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { admin } = req.body;
  const result = await adminService.updateAdminIntoBD(id, admin);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "update admin data is successfully",
    data: result,
  });
});

export const adminController = {
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
};

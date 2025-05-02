import httpStatus from "http-status";

import { UserService } from "./user.service";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";

const createUser = catchAsync(async (req, res) => {
  const result = await UserService.createUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User is created succesfully",
    data: result,
  });
});

const findUserById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserService.findUserById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is retrieved succesfully",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const users = await UserService.getAllUsers();
  console.log(users);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieved successfully",
    data: users,
  });
});

const updateUserById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserService.updateUserById(id, req.body);
  console.log(result);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is updated succesfully",
    data: result,
  });
});

const deleteUserById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserService.deleteUserById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is deleted succesfully",
    data: result && null,
  });
});

export const UserController = {
  createUser,
  findUserById,
  getAllUsers,
  updateUserById,
  deleteUserById,
};

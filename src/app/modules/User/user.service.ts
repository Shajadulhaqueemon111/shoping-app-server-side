/* eslint-disable @typescript-eslint/no-explicit-any */

import mongoose from "mongoose";

import { TAdmin } from "../admin/admin.interface";
import Admin from "../admin/admin.modle";
import { IUser } from "./user.interface";
import { User } from "./user.model";

import AppError from "../../error/app.error";
import httpStatus from "http-status";
const createUser = async (payload: IUser) => {
  const result = await User.create(payload);
  return result;
};

const getSingleUser = async (userId: string) => {
  return await User.findById(userId);
};

const getAllUsers = async () => {
  const result = await User.find();
  return result;
};

const updateUserById = async (userId: string, payload: Partial<IUser>) => {
  const result = await User.findByIdAndUpdate({ _id: userId }, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteUserById = async (userId: string) => {
  const result = await User.findByIdAndDelete(userId);
  return result;
};

const createAdminIntoDB = async (password: string, payload: TAdmin) => {
  const userData: Partial<IUser> = {
    role: "admin",
    email: payload.email,
    name: payload.name,
  };
  userData.password = password;
  const session = await mongoose.startSession();
  session.startTransaction(); // ✅ THIS IS MISSING

  try {
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }

    payload.user = newUser[0]._id;

    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }

    await session.commitTransaction(); // ✅ COMMIT
    session.endSession();

    return newAdmin[0]; // return the created admin object
  } catch (err) {
    await session.abortTransaction(); // ✅ ABORT ON ERROR
    session.endSession();
    throw err;
  }
};

export const UserService = {
  createUser,
  getSingleUser,
  getAllUsers,
  updateUserById,
  deleteUserById,
  createAdminIntoDB,
};

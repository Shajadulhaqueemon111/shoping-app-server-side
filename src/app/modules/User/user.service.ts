/* eslint-disable @typescript-eslint/no-explicit-any */

import mongoose from "mongoose";
import config from "../../config";
import { TAdmin } from "../admin/admin.interface";
import Admin from "../admin/admin.modle";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import bcryptJs from "bcryptjs";
import AppError from "../../error/app.error";
import httpStatus from "http-status";
const createUser = async (user: IUser) => {
  user.password = await bcryptJs.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  return await User.create(user);
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
  const userData: Partial<IUser> = {};

  userData.role = "admin";

  userData.email = payload.email;

  try {
    const session = await mongoose.startSession();
    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }
    // set id , _id as user

    payload.user = newUser[0]._id; //reference _id

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }

    await (await session).commitTransaction();
    await (await session).endSession();

    return newAdmin;
  } catch (err: any) {
    throw new Error(err);
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

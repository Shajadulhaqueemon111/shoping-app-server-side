import config from "../../config";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import bcryptJs from "bcryptjs";
const createUser = async (user: IUser) => {
  user.password = await bcryptJs.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  return await User.create(user);
};

const findUserById = async (userId: string) => {
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

export const UserService = {
  createUser,
  findUserById,
  getAllUsers,
  updateUserById,
  deleteUserById,
};

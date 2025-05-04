import AppError from "../../error/app.error";
import { User } from "../User/user.model";
import httpStatus from "http-status";

import bcrypt from "bcryptjs";
export const validUserForLogin = async (id: string) => {
  const user = await User.findOne({ id }).select("+password");

  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, "user in not found");
  }

  return user;
};

export const checkPassword = async (
  givenPassword: string,
  savePassword: string
) => {
  const isMatched = await bcrypt.compare(givenPassword, savePassword);

  if (!isMatched) {
    throw new AppError(httpStatus.FORBIDDEN, "password does not matched");
  }

  return isMatched;
};

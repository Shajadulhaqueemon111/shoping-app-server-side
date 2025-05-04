import config from "../../config";
import AppError from "../../error/app.error";
import { TLogin } from "./auth.interface";
import { createToken } from "./auth.jwtUtils";
import { checkPassword, validUserForLogin } from "./auth.utils";
import httpStatus from "http-status";
const LoginUser = async (payload: TLogin) => {
  const { password, id } = payload;
  console.log(typeof id);
  if (!id) {
    throw new AppError(httpStatus.BAD_REQUEST, "User ID cannot be undefined");
  }
  if (!password) {
    throw new AppError(httpStatus.BAD_REQUEST, "Password cannot be undefined");
  }
  const user = await validUserForLogin(id);
  console.log(user);
  const isPasswordMatched = await checkPassword(password, user.password);
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Password is incorrect");
  }

  const jwtPayload = {
    userId: user?.id,
    role: user?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as unknown as number
  );

  const refressToken = createToken(
    jwtPayload,
    config.jwt_refress_secreet as string,
    config.jwt_refress_expires_in as unknown as number
  );

  return {
    accessToken,
    refressToken,
  };
};

export const authService = {
  LoginUser,
};

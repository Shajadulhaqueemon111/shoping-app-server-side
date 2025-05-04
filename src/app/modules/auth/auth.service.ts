import config from "../../config";
import AppError from "../../error/app.error";
import { TLogin } from "./auth.interface";
import { createToken } from "./auth.jwtUtils";
import { checkPassword, validUserForLogin } from "./auth.utils";
import httpStatus from "http-status";
const LoginUser = async (payload: TLogin) => {
  const { password, email } = payload;
  console.log(typeof email);
  if (!email) {
    throw new AppError(httpStatus.BAD_REQUEST, "User ID cannot be undefined");
  }
  if (!password) {
    throw new AppError(httpStatus.BAD_REQUEST, "Password cannot be undefined");
  }
  const user = await validUserForLogin(email);
  console.log(user);
  const isPasswordMatched = await checkPassword(password, user.password);
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Password is incorrect");
  }

  const jwtPayload = {
    userId: user?.email,
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

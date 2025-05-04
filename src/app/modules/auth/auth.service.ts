import config from "../../config";
import { TLogin } from "./auth.interface";
import { createToken } from "./auth.jwtUtils";
import { checkPassword, validUserForLogin } from "./auth.utils";

const LoginUser = async (payload: TLogin) => {
  const { password, id } = payload;
  const user = await validUserForLogin(id);

  await checkPassword(password, user.password);

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

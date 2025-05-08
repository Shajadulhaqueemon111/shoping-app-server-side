import config from "../../config";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import { authService } from "./auth.service";
import httpSattus from "http-status";
const loginUser = catchAsync(async (req, res) => {
  const result = await authService.LoginUser(req.body);
  const { accessToken, refressToken } = result;
  res.cookie("refreshToken", refressToken, {
    secure: config.NODE_ENV === "development",
    httpOnly: true,
    sameSite: "strict",
  });
  sendResponse(res, {
    statusCode: httpSattus.OK,
    success: true,
    message: "User is Logged in successfully!",
    data: {
      accessToken,
    },
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await authService.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpSattus.OK,
    success: true,
    message: "AccessToken  is retrive  successfully!",
    data: result,
  });
});
export const authController = {
  loginUser,
  refreshToken,
};

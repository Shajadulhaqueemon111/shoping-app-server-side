import config from "../../config";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import { authService } from "./auth.service";
import httpSattus from "http-status";
const loginUser = catchAsync(async (req, res) => {
  const result = await authService.LoginUser(req.body);
  const { accessToken, refressToken } = result;
  res.cookie("refreshToken", refressToken, {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
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

export const authController = {
  loginUser,
};

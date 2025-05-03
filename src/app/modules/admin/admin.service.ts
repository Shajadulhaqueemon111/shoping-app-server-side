/* eslint-disable @typescript-eslint/no-unused-vars */
import { TAdmin } from "./admin.interface";
import Admin from "./admin.modle";

const createAdminIntoDB = async (password: string, payload: TAdmin) => {
  const result = await Admin.create();
  return result;
};

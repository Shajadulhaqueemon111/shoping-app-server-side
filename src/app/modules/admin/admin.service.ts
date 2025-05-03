/* eslint-disable @typescript-eslint/no-unused-vars */
import { TAdmin } from "./admin.interface";
import Admin from "./admin.modle";

const getAllAdminIntoDB = async () => {
  const result = await Admin.find();
  return result;
};

const getSingleAdminIntoDB = async (id: string) => {
  const result = await Admin.findById(id);
  return result;
};

const updateAdminIntoBD = async (id: string, payload: Partial<TAdmin>) => {
  const result = await Admin.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const adminService = {
  getAllAdminIntoDB,
  getSingleAdminIntoDB,
  updateAdminIntoBD,
};

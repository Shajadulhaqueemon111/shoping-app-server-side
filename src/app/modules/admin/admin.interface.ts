import { Types } from "mongoose";

export type TAdmin = {
  id: string;
  user: Types.ObjectId;
  name: string;
  email: string;
  phoneNumber: string;
  profileImage?: string;
  address: string;
};

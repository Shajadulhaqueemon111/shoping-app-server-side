import { USER_ROLE } from "./user.contsnt";

export interface IUser {
  name: string;
  profilImage: string;
  email: string;
  password: string;
  role: "admin" | "user";
}
export type TUserRole = keyof typeof USER_ROLE;

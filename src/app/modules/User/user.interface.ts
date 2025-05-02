export interface IUser {
  name: string;
  profilImage: string;
  rating: number;
  email: string;
  password: string;
  role: "admin" | "user";
}

import { z } from "zod";

export const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string({
      required_error: "password is required",
    }),
    role: z.enum(["admin", "user"]).optional(),
    profilImage: z.string(),
    rating: z.number(),
  }),
});

export const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().optional(),
    role: z.enum(["admin", "user"]).optional(),
    profilImage: z.string().optional(),
    rating: z.number().optional(),
  }),
});

export const UserValidation = {
  createUserValidationSchema,
  updateUserValidationSchema,
};

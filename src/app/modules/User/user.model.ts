/* eslint-disable no-useless-escape */
// models/User.ts
import mongoose, { Schema } from "mongoose";
import { IUser } from "./user.interface";
import { validateEmail } from "./user.utils";

const userSchema: Schema<IUser> = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
    validate: [validateEmail, "Please fill a valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  profilImage: { type: String },
  rating: { type: Number, default: 0 },
});

userSchema.post("save", function (doc, next) {
  //   console.log(this, 'post hook : we will save data');
  doc.password = "";
  next();
});

export const User = mongoose.model<IUser>("User", userSchema);

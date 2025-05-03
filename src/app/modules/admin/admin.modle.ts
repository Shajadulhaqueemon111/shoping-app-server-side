import { model, Schema } from "mongoose";
import { TAdmin } from "./admin.interface";

const adminSchema = new Schema<TAdmin>({
  id: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, "User id is required"],
    unique: true,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  phoneNumber: {
    type: String,
    required: true,
  },

  profileImage: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
});

const Admin = model<TAdmin>("Admin", adminSchema);

export default Admin;

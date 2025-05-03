import { model, Schema } from "mongoose";
import { TAdmin } from "./admin.interface";

const adminSchema = new Schema<TAdmin>({
  user: {
    type: Schema.Types.ObjectId,
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

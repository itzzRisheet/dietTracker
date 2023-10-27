import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "please provide unique Username"],
    unique: [true, "username already exists"],
  },
  password: {
    type: String,
    required: [true, "please provide a password"],
    unique: false,
  },
  email: {
    type: String,
    required: [true, "please provide a unique email address"],
    unique: true,
  },
  FirstName: { type: String },
  LastName: { type: String },
  mobile: { type: Number },
  address: { type: String },
  profile: { type: String },
});

export default mongoose.model.users || mongoose.model("user", UserSchema);

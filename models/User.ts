import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  email: { type: String, required: true },
  department: { type: String, required: true },
  year: { type: String, required: true }
});

export default mongoose.models.User ||
  mongoose.model("User", UserSchema);

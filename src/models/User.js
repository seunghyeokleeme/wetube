import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  name: { type: String, required: true, default: "홍길동" },
  location: { type: String, required: true, default: "지구" },
  agreement: {
    termsOfService: { type: Boolean, required: true, default: true },
    privacyPolicy: { type: Boolean, required: true, default: false },
    allowPromotions: { type: Boolean, required: true, default: false },
  },
});

const User = mongoose.model("User", userSchema);
export default User;

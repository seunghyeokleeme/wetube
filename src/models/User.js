import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, unique: true, trim: true },
  name: { type: String, required: true, default: "홍길동", trim: true },
  location: { type: String, required: true, default: "지구", trim: true },
  agreement: {
    termsOfService: { type: Boolean, required: true, default: true },
    privacyPolicy: { type: Boolean, required: true, default: false },
    allowPromotions: { type: Boolean, required: true, default: false },
  },
});

userSchema.pre("validate", function (next) {
  this.name = this.name.trim();
  this.location = this.location.trim();

  if (this.name === "") {
    this.name = "홍길동";
  }
  if (this.location === "") {
    this.location = "지구";
  }
  next();
});

const User = mongoose.model("User", userSchema);
export default User;

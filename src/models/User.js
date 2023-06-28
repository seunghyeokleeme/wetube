import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, trim: true },
  name: { type: String, required: true, default: "홍길동", trim: true },
  location: { type: String, required: true, default: "지구", trim: true },
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

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 5);
});

const User = mongoose.model("User", userSchema);
export default User;

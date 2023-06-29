import { UnauthorizedError } from "../errors";
import User from "../models/User";
import bcrypt from "bcrypt";

export const getUserByUsername = (username) => {
  return User.findOne({ username });
};

export const getUserById = (userId) => {
  return User.findById(userId);
};

export const getUserByEmail = (email) => {
  return User.findOne({ email });
};

export const registerUser = (userDetails) => {
  const { email, username, password, name, location } = userDetails;
  const data = {
    email,
    username,
    password,
    name,
    location,
  };
  return User.create(data);
};

export const existsUser = (condition, toBoolean = false) => {
  const query = User.exists(condition);
  return toBoolean ? query.then((user) => Boolean(user)) : query;
};

export const verifyPassword = async (inputPassword, userPassword) => {
  const isPasswordValid = await bcrypt.compare(inputPassword, userPassword);
  if (!isPasswordValid) {
    throw new UnauthorizedError("잘못된 사용자 이름 또는 비밀번호.", "login");
  }
};

export const loginUser = async (user, password) => {
  await verifyPassword(password, user.password);
  // ToDo: createToken(userId, username)
  const token = "토큰 생성";
  return { token, userId: user.id };
};

export const updateProfile = (userId, newDetails) => {
  const { name, location } = newDetails;
  const data = {
    name,
    location,
  };
  return User.findByIdAndUpdate(userId, data);
};

export const deleteUser = (userId) => {
  return User.findByIdAndDelete(userId);
};

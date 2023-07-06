import { UnauthorizedError } from "../errors";
import User from "../models/User";
import bcrypt from "bcrypt";

export const getUserById = (userId) => {
  return User.findById(userId);
};

export const getUserByUsername = (username, filters = {}) => {
  return User.findOne({ username, ...filters });
};

export const getUserByEmail = (email, filters = {}) => {
  return User.findOne({ email, ...filters });
};

export const registerUser = (userDetails, socialOnly = false) => {
  const { email, username, avatarUrl, password, name, location } = userDetails;
  const data = {
    email,
    username,
    avatarUrl,
    socialOnly,
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

export const verifyPassword = async (
  inputPassword,
  userPassword,
  context = "login"
) => {
  const isPasswordValid = await bcrypt.compare(inputPassword, userPassword);

  const errorMessages = {
    login: "잘못된 사용자 이름 또는 비밀번호",
    "change-password":
      "비밀번호 변경에 실패했습니다! 이전 비밀번호를 확인해주세요.",
  };
  if (!isPasswordValid) {
    const errorMsg = errorMessages[context] || "비밀번호가 틀렸습니다!";
    throw new UnauthorizedError(errorMsg, context);
  }
};

export const loginUser = async (user, password) => {
  await verifyPassword(password, user.password, "login");
  // ToDo: createToken(userId, username)
  const token = "토큰 생성";
  return { token, userId: user.id };
};

export const updateProfile = (userId, newDetails) => {
  const { email, username, name, location } = newDetails;
  const data = {
    email,
    username,
    name,
    location,
  };
  return User.findByIdAndUpdate(userId, data, { new: true });
};

export const deleteUser = (userId) => {
  return User.findByIdAndDelete(userId);
};

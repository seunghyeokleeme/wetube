import User from "../models/User";

export const getUserByUsername = (userId) => {};

export const getUserById = (userId) => {};

export const getUserByEmail = (userId) => {};

export const registerUser = (userDetails) => {};

export const existsUser = (condition, toBoolean = false) => {
  const query = User.exists(condition);
  return toBoolean ? query.then((user) => Boolean(user)) : query;
};

export const loginUser = (email, password) => {};

export const updateProfile = (userId, newDetails) => {};

export const deleteUser = (userId) => {};

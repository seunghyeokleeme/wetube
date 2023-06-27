import User from "../models/User";

export const getUserByUsername = (username) => {};

export const getUserById = (userId) => {};

export const getUserByEmail = (email) => {};

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

export const loginUser = (email, password) => {};

export const updateProfile = (userId, newDetails) => {};

export const deleteUser = (userId) => {};

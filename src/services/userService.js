import User from "../models/User";

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

export const updateProfile = (userId, newDetails) => {
  const { email, username, name, location, file } = newDetails;
  const data = {
    email,
    username,
    name,
    location,
    avatarUrl: file?.path,
  };
  return User.findByIdAndUpdate(userId, data, { new: true });
};

export const deleteUser = (userId) => {
  return User.findByIdAndDelete(userId);
};

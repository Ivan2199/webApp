const User = require("../model/User");

async function createUser(userParams) {
  const { firstName, lastName, userName, password, email } = userParams;

  const user = await User.create({
    email,
    password,
    firstName,
    lastName,
    userName,
  });
  return user;
}

async function fetchUser(options) {
  const user = await User.findOne(options);
  return user;
}

module.exports = {
  createUser,
  fetchUser,
};

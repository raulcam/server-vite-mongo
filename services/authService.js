const users = require("../models/userModel");

const authService = async (email, password) => {
  const auth = await users.findOne({ email, password });
  return auth || null;
};

module.exports = {
  authService,
};

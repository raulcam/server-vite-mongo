const users = require("../models/userModel");
const bcrypt = require("bcrypt");

const authService = async (email, password) => {
  const auth = await users.findOne({ email });
  const isMatch = await bcrypt.compare(password, auth.password);
  if (!isMatch) {
    console.log("La contraseña no coincide");
    return null;
  }

  return auth || null;
};

module.exports = {
  authService,
};

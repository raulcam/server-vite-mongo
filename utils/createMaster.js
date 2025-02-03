const bcrypt = require("bcrypt");
const User = require("../models/userModel"); // Importa el modelo de usuario

const createMasterUser = async () => {
  try {
    const existingMaster = await User.findOne({ role: "master" });

    if (!existingMaster) {
      const hashedPassword = await bcrypt.hash("master1996", 10);

      const masterUser = new User({
        username: "MasterAdmin",
        email: "master@admin.com",
        password: hashedPassword,
        role: "master",
      });

      await masterUser.save();
      console.log("Ser creo master");
    } else {
      console.log("Master");
    }
  } catch (error) {
    console.error("Error al crear el usuario master:", error);
    next(error)
  } 
};

module.exports = { createMasterUser };
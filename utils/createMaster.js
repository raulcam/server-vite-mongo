const bcrypt = require("bcrypt");
const User = require("../models/userModel"); // Importa el modelo de usuario

const createMasterUser = async () => {
  try {
    const existingMaster = await User.findOne({ role: "superadmin" });

    if (!existingMaster) {
      const hashedPassword = await bcrypt.hash("superadmin123", 10);

      const masterUser = new User({
        username: "SuperAdmin",
        email: "superadmin@admin.com",
        password: hashedPassword,
        role: "superadmin",
      });

      await masterUser.save();
      console.log("Ser creo superadmin");
    } else {
      console.log("Superadmin");
    }
  } catch (error) {
    console.error("Error al crear el usuario superadmin:", error);
    next(error)
  } 
};
const createaAdminUser = async () => {
  try {
    const existingMaster = await User.findOne({ role: "admin" });

    if (!existingMaster) {
      const hashedPassword = await bcrypt.hash("admin123", 10);

      const masterUser = new User({
        username: "Admin",
        email: "admin@admin.com",
        password: hashedPassword,
        role: "admin",
      });

      await masterUser.save();
      console.log("Ser creo admin");
    } else {
      console.log("Admin");
    }
  } catch (error) {
    console.error("Error al crear el usuario sadmin:", error);
    next(error)
  } 
};

module.exports = { createMasterUser,createaAdminUser };
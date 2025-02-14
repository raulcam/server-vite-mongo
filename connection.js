const mongoose = require("mongoose");
const { createMasterUser, createaAdminUser } = require("./utils/createMaster");
const uri = "mongodb://localhost:27017/admin";

const db = mongoose.connection;
//TODOConexion con mongo
try {
  mongoose.connect(uri);
} catch (error) {
  console.log(error);
}

db.on("open", async () => {
  console.log("Data base conected", uri);
  try {
    await createMasterUser();
    await createaAdminUser()
  } catch (error) {
    console.error("Error al crear el usuario master:", error);
  }
});

db.on("error", (err) => {
  console.log("Error Data base conected", err);
});

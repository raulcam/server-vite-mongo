const mongoose = require("mongoose");
const uri = "mongodb://localhost:27017/admin";

const db = mongoose.connection;
//TODOConexion con mongo
try {
  mongoose.connect(uri);
} catch (error) {
  console.log(error);
}

db.on("open", (_) => {
  console.log("Data base conected", uri);
});

db.on("error", (err) => {
  console.log("Error Data base conected", err);
});  
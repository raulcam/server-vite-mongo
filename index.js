const express = require("express");
const cors = require('cors')
require("./connection");

const PORT = '4000'
const app = express();
const authRouter = require("./routes/authUser");
const userRouter = require("./routes/users");
const { errorHandler } = require("./midelware/errorHandler");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }) 
);

app.use(express.json());

//TODO Rutas
app.use("/auth", authRouter);
app.use("/users", userRouter);

//Manejador de errores
app.use(errorHandler);

//TODO Importante para checar el puerto desde el front
app.listen(PORT, () => {
  console.log(`Servidor Corriendo en el puerto http://localhost:${PORT}`);
});

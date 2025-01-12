const express = require("express");
const { authenticateToken } = require("../midelware/authJWT");
const { getUserId, getAllUsers, createUser, updateExistingUser, deleteUserExiting } = require("../controllers/userController");

const userRouter = express.Router();

// Obtener todos los usuarios
userRouter.get("/", authenticateToken, getAllUsers);

//Obtener un solo elemento del arreglo
userRouter.get("/:id", authenticateToken, getUserId);

// //Crear un nuevo usuario
userRouter.post("/", authenticateToken, createUser);

// // Actualizar un usuario
userRouter.put("/:id", authenticateToken, updateExistingUser);

// // Eliminar un usuario
userRouter.delete("/:id", authenticateToken, deleteUserExiting);

module.exports = userRouter;

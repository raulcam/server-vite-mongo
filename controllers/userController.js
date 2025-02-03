const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const {
  getUserById,
  getUsers,
  createNewUser,
  getExistingUser,
  updateUser,
  deleteUser,
  getTokenUser,
} = require("../services/userService");

const getMeUser = async (req, res) => {
  try {
    const user = await getTokenUser(req.user.id);
    res.status(200).json( user );
  } catch (error) {
    next(error);
  }
};

const getUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const catalogo = await getUsers();
    res.status(200).json({ users: catalogo });
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email.includes("@")) {
      return res.status(401).json({ message: "No es un correo" });
    }

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "El email no existe y el password es requerido" });
    }

    const existingUser = await getExistingUser(name, email);

    const hashedPassword = await bcrypt.hash(password, 10);

    const item = {
      name: req.body.name ?? "",
      phone: req.body.phone ?? "",
      username: req.body.username ?? "",
      email: req.body.email,
      isUser: req.body.isUser ?? false,
      password: hashedPassword,
    };

    if (existingUser) {
      res.status(404).json({ message: "El usuario ya existe" });
    } else {
      const newUser = await createNewUser(item);
      res.status(200).json({ message: "Usuario creado", user: newUser });
    }
  } catch (error) {
    next(error);
  }
};

const updateExistingUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!Object.keys(updateData).length) {
      return res
        .status(400)
        .json({ message: "No se enviaron datos para actualizar" });
    }

    const updateUsers = await updateUser(id, updateData);
    if (!updateUsers) {
      res.status(404).json({ message: "No se actualizo" });
    }

    res.status(200).json({ message: "Usuario actualizado", user: updateUsers });
  } catch (error) {
    next(error);
  }
};

const deleteUserExiting = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "Usuario ya fue eliminado" });
    }

    if (user.role === "master") {
      return res
        .status(403)
        .json({ message: "No puedes eliminar al usuario master" });
    }

    const deletUser = await deleteUser(req.params.id);

    if (!deletUser) {
      res.status(400).json({ message: "No se pudo eliminar" });
    }

    res.status(200).json({ menssage: "Se elimino", user: req.body });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserId,
  getAllUsers,
  createUser,
  updateExistingUser,
  deleteUserExiting,
  getMeUser,
};

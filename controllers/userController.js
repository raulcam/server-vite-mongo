const {
  getUserById,
  getUsers,
  createNewUser,
  getExistingUser,
  updateUser,
  deleteUser,
} = require("../services/userService");

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

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "El email no existe y el password es requerido" });
    }

    const existingUser = await getExistingUser(name, email);

    const item = {
      name: req.body.name ?? "",
      phone: req.body.phone ?? "",
      username: req.body.username ?? "",
      email: req.body.email,
      isUser: req.body.isUser ?? false,
      createdAt: req.body.createdAt ?? new Date().toISOString(),
      updateAt: req.body.updateAt ?? new Date().toISOString(),
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
    const { id } = req.params;

    const deletUser = await deleteUser(id);

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
};

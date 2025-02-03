const User = require("../models/userModel");
const { authService } = require("../services/authService");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "MY_SECRET";

const authUserController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await authService(email, password);
    
    if (!usuario) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        email: usuario.email,
        role: usuario.role
      },
      SECRET_KEY,
      {
        expiresIn: "10h",
      }
    );
 
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = {
  authUserController,
};

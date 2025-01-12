const { authService } = require("../services/authService");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "mySecretKey123";

const authUserController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await authService(email, password);
    
    if (!usuario) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        email: usuario.email,
      },
      SECRET_KEY,
      {
        expiresIn: "5h",
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

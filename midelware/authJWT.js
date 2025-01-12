require("../connection");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "mySecretKey123";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  try {
    const user = jwt.verify(token, SECRET_KEY);
    req.user = user;

    next();
  } catch (error) {
    return res.status(403).json({ message: "Token inválido" });
  }
};

module.exports = {
  authenticateToken,
};
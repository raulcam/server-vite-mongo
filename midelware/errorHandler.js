

const errorHandler = (err, req, res, next) => {
    console.error("Error capturado:", err.message);
  
    // Responder con un mensaje de error genérico o detallado (según el entorno)
    res.status(err.status || 500).json({
      message: err.message || "Error interno del servidor",
    });
  };
  
  module.exports = {
    errorHandler
  }
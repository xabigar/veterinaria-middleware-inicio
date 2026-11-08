const { validationResult } = require('express-validator');

// Parte 3: middleware que se ejecuta DESPUÉS de la cadena de validación.
//   - Si no hay errores: next()
//   - Si hay errores: crear un Error y enviarlo al middleware de errores con next(err):
//       err.status = 400
//       err.errors = { campo: 'mensaje', … }      ← mismo formato que las respuestas de Mongoose
//   Pista: validationResult(req).array() → [ { path, msg, … }, … ]   (path: el campo · msg: el mensaje)
module.exports = (req, res, next) => {
  // TODO
  next();
};

// Parte 1: middleware de aplicación
// Escribir en la consola una línea por petición: método, ruta, código de estado y duración.
//   POST /appointments 201 12 ms
//
// Pistas:
//   - req.method, req.originalUrl, res.statusCode
//   - El código de estado solo se conoce DESPUÉS de enviar la respuesta: res.on('finish', () => { … })
//   - No olvides next()
//
// Después, registrarlo en server.js (app.use). ¿Dónde? ¿Por qué?
module.exports = (req, res, next) => {
  // TODO
  next();
};

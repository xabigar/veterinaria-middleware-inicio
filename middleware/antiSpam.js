// Parte 2: middleware de ruta (POST /appointments)
// Si una IP (req.ip) ha creado una cita en los últimos 10 segundos:
//   → 429 Too Many Requests: { error: 'Espera …' }
// Si no, guardar el momento y dejar pasar (next).
// Basta con memoria: un Map o un objeto simple.
const WINDOW_MS = 10_000;
const lastRequest = new Map();          // IP → momento de la última petición (Date.now())

module.exports = (req, res, next) => {
  // TODO
  next();
};

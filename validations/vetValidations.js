const { query, param, body } = require('express-validator');
const DAYS = require('../models/days');

// Parte 3 · GET /vets?day=…&speciality=…
//   day:        opcional; si existe, un valor de DAYS (admitir mayúsculas: trim + toLowerCase)
//   speciality: opcional; si existe, no puede estar vacío
exports.searchVets = [
  // TODO
];

// Parte 3 · PATCH /vets/:id
//   id:    ObjectId válido (isMongoId) → se evita el CastError
//   email: obligatorio y con formato correcto
exports.updateVetEmail = [
  // TODO
];

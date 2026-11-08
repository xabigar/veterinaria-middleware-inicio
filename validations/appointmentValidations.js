const { body } = require('express-validator');

// Parte 3 · POST /appointments
//   date:   formato ISO (isISO8601) Y en el futuro (custom)
//   reason: obligatorio (trim + notEmpty)
//   pet:    ObjectId válido
//   vet:    ObjectId válido
// Mensajes personalizados: .withMessage('…')
exports.createAppointment = [
  // TODO
];

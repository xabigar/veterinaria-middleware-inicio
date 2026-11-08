const router = require('express').Router();
const { matchedData } = require('express-validator');
const Vet = require('../models/Vet');
const validate = require('../middleware/validate');
const { searchVets, updateVetEmail } = require('../validations/vetValidations');

// POST /vets: crear un veterinario (para hacer pruebas)
router.post('/', async (req, res, next) => {
  try {
    const vet = await Vet.create(req.body);
    res.status(201).json(vet);
  } catch (err) { next(err); }
});

// GET /vets?day=lunes&speciality=perros
//    Los que estén disponibles ese día O tengan esa especialidad ($or)
//    TODO parte 3: añadir los middlewares searchVets y validate a esta ruta.
//    Después, usar matchedData(req) en lugar de req.query: valores validados y limpiados.
router.get('/', async (req, res, next) => {
  try {
    const { day, speciality } = req.query;
    const conditions = [];
    if (day) conditions.push({ availableDays: String(day).toLowerCase() });
    if (speciality) conditions.push({ speciality: String(speciality).toLowerCase() });

    const filter = conditions.length ? { $or: conditions } : {};
    const vets = await Vet.find(filter).sort({ name: 1 });
    res.json(vets);
  } catch (err) { next(err); }
});

// PATCH /vets/:id: actualizar el email
//    TODO parte 3: añadir updateVetEmail y validate. Después se puede quitar la comprobación manual.
//    returnDocument: 'after' → devuelve el documento actualizado (si no, el antiguo)
//    runValidators: true     → el validador match también se ejecuta al actualizar
router.patch('/:id', async (req, res, next) => {
  try {
    const { email } = req.body ?? {};
    if (!email) return res.status(400).json({ error: 'Falta el campo email' });

    const vet = await Vet.findByIdAndUpdate(
      req.params.id,
      { email },
      { returnDocument: 'after', runValidators: true }
    );
    if (!vet) return res.status(404).json({ error: 'Veterinario no encontrado' });
    res.json(vet);
  } catch (err) { next(err); }
});

module.exports = router;

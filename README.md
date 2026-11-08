# API de veterinaria · Middlewares (proyecto inicial)

La base es la solución del ejercicio anterior: toda la API funciona. Ahora le vas a añadir **middlewares**:
registro (logging), protección contra el spam y validación con express-validator.
Busca la palabra `TODO` en los ficheros.

## Arrancar

```bash
npm install     # la primera vez también descarga MongoDB (~100 MB)
npm run dev     # http://localhost:3000 · MongoDB en memoria + datos de ejemplo
```

## Ficheros nuevos

```
middleware/
├── logger.js                 parte 1
├── antiSpam.js               parte 2
├── validate.js               parte 3
└── errorHandler.js           parte 4 (completar)
validations/
├── vetValidations.js         parte 3
└── appointmentValidations.js parte 3
models/days.js                YA HECHO: días de la semana (los usan el modelo Vet y las validaciones)
```

## Parte 1 · Logger (de aplicación)

Una línea por petición en la consola: `POST /appointments 201 12 ms`.

- `req.method`, `req.originalUrl`, `res.statusCode`.
- El código de estado se conoce **después** de enviar la respuesta: `res.on('finish', …)`.
- Registrarlo en `server.js`. ¿Dónde, para registrar **todas** las peticiones (incluidos los 404 y los errores)?

## Parte 2 · Antispam (de ruta: `POST /appointments`)

Si una IP (`req.ip`) ha creado una cita en los últimos **10 segundos** → `429 Too Many Requests`.
Si no, guardar el momento y `next()`. Basta con memoria (un `Map`).

## Parte 3 · Validación con express-validator

| Ruta | Qué validar |
|---|---|
| `GET /vets?day=…&speciality=…` | `day` opcional, pero si existe, un día de la semana (admitir mayúsculas) · `speciality` opcional, no vacío |
| `POST /appointments` | `date` en formato ISO **y en el futuro** · `reason` obligatorio · `pet` y `vet` ObjectId válidos |
| `PATCH /vets/:id` | `id` ObjectId válido · `email` obligatorio y con formato correcto |

- Las cadenas de validación van en la carpeta `validations/`; en las rutas, **antes** del controlador.
- `middleware/validate.js`: si hay errores, `next(err)` con código 400.
- La respuesta debe tener el mismo formato que los errores de Mongoose:
  `{ "error": "Datos inválidos", "errors": { "date": "…", "pet": "…" } }`
- En las rutas, en lugar de `req.query`/`req.body`, usar `matchedData(req)`: valores validados y limpiados.
- En `POST /appointments`, `antiSpam` y la validación: ¿en qué orden?

## Parte 4 · Middleware de errores

`errorHandler.js` ya gestiona los errores de Mongoose. Añade los errores con `err.status`
(los que crea `validate`): ese código y la respuesta `{ error, errors }`.

## Probar

Al final de `requests.http` están las pruebas de los middlewares. Al reiniciar el servidor, los datos
vuelven al estado inicial y se vacía la memoria del antispam.

## Preguntas para la puesta en común

1. En `POST /appointments`, ¿el antispam antes o después de la validación? ¿Qué cambia?
2. ¿Por qué validar que `date` está en el futuro con express-validator y no en el esquema de Mongoose?
3. Antispam en memoria: ¿qué pasa al reiniciar el servidor, o si tenemos dos servidores?

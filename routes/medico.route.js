const { Router } = require('express');
const { check } = require('express-validator');
const { validateFieldsMdw } = require('../midddlewares/validate-fields.mdw');

const router = Router();
const {
  getMedico,
  addMedico,
  editMedico,
  deleteMedico,
} = require('../controller/medico.controller');
const { validateJWTMdw } = require('../midddlewares/validate-jwt.mdw');

router.get('/', validateJWTMdw, getMedico);
router.delete('/:id', validateJWTMdw, deleteMedico);
router.post(
  '/add',
  [
    validateJWTMdw,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('hospital', 'El hospital debe ser un id valido').isMongoId(),
    validateFieldsMdw,
  ],
  addMedico
);
router.put(
  '/:id',
  [validateJWTMdw, check('nombre', 'El nombre es obligatorio').not().isEmpty(), validateFieldsMdw],
  editMedico
);

module.exports = router;

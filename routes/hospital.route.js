const { Router } = require('express');
const { check } = require('express-validator');
const { validateFieldsMdw } = require('../midddlewares/validate-fields.mdw');

const router = Router();
const {
  getHospital,
  addHospital,
  editHospital,
  deleteHospital,
} = require('../controller/hospital.controller');
const { validateJWTMdw } = require('../midddlewares/validate-jwt.mdw');

router.get('/', validateJWTMdw, getHospital);
router.delete('/:id', validateJWTMdw, deleteHospital);
router.post(
  '/add',
  [validateJWTMdw, check('nombre', 'El nombre es obligatorio').not().isEmpty(), validateFieldsMdw],
  addHospital
);
router.put(
  '/:id',
  [validateJWTMdw, check('nombre', 'El nombre es obligatorio').not().isEmpty(), validateFieldsMdw],
  editHospital
);

module.exports = router;

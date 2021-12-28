const { Router } = require('express');
const { check } = require('express-validator');
const { validateFieldsMdw } = require('../midddlewares/validate-fields.mdw');

const router = Router();

const { login } = require('../controller/auth.controller');
router.post(
  '/login',
  [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validateFieldsMdw,
  ],
  login
);

module.exports = router;

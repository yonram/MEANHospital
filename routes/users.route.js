const { Router } = require('express');
const { check } = require('express-validator');
const { validateFieldsMdw } = require('../midddlewares/validate-fields.mdw');

const router = Router();
const {
  getUsers,
  addUsers,
  editUsers,
  deleteUsers,
  search,
} = require('../controller/users.controller');
const { validateJWTMdw } = require('../midddlewares/validate-jwt.mdw');

router.get('/', validateJWTMdw, getUsers);
router.delete('/:id', validateJWTMdw, deleteUsers);
router.post(
  '/add',
  [
    validateJWTMdw,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validateFieldsMdw,
  ],
  addUsers
);
router.put(
  '/:id',
  [
    validateJWTMdw,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('role', 'El rol es obligatorio').not().isEmpty(),
    validateFieldsMdw,
  ],
  editUsers
);

router.get('/search/:query', validateJWTMdw, search);

module.exports = router;

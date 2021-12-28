const { Router } = require('express');
const expressFileUpload = require('express-fileupload');

const router = Router();

const { fileUpload, getUpload } = require('../controller/upload.controller');
const { validateJWTMdw } = require('../midddlewares/validate-jwt.mdw');

router.use(expressFileUpload());

router.put('/:type/:id', validateJWTMdw, fileUpload);
router.get('/:type/:img', getUpload);

module.exports = router;

const jwt = require('jsonwebtoken');

const validateJWTMdw = (req, res, next) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      ok: false,
      errors: 'no hay token en el app',
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = uid;

    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      errors: 'Token no valido',
    });
  }
};

module.exports = {
  validateJWTMdw,
};

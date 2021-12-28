const jwt = require('jsonwebtoken');

const generateJWT = (uid) => {
  return new Promise((resolve, reject) => {
    const payLoad = {
      uid,
    };

    jwt.sign(
      payLoad,
      process.env.JWT_SECRET,
      {
        expiresIn: '16h',
      },
      (err, token) => {
        if (err) {
          console.log(`error ${err}`);
          reject('error al obtener el webToken');
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  generateJWT,
};

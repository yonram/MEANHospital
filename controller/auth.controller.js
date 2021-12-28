const { response } = require('express');
const UsersModel = require('../models/user.model');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helperds/jwt');

const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    //verifica email
    const users = await UsersModel.findOne({ email });

    if (!users) {
      res.status(404).json({
        ok: false,
        msg: 'Credenciales no validas',
      });
    }

    //verifica password
    const validatePassword = bcryptjs.compareSync(password, users.password);
    if (!validatePassword) {
      res.status(400).json({
        ok: false,
        msg: 'Credenciales no validas',
      });
    }

    //generar token
    const token = await generateJWT(users.id);
    res.status(400).json({
      ok: true,
      token: token,
      msg: 'Se genero el token correctamente',
    });

    res.status(201).json({
      ok: true,
      msg: 'login',
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: `Problemas al autenticar, hable con el administrador, ${error}`,
    });
  }
};

module.exports = {
  login,
};

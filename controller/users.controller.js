const { response } = require('express');
const UsersModel = require('../models/user.model');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helperds/jwt');

const getUsers = async (req, res) => {
  const from = Number(req.query.from) || 0;

  [users, total] = await Promise.all([
    UsersModel.find({}, 'nombre email role google img').skip(from).limit(5),
    UsersModel.countDocuments(),
  ]);

  res.status(201).json({
    ok: true,
    users: users,
    uid: req.uid,
    total,
    msg: 'getUsers',
  });
};

const addUsers = async (req, res = response) => {
  const { password, email } = req.body;

  try {
    const existUser = await UsersModel.findOne({ email });

    if (existUser) {
      console.log('usuario ya existe');

      res.status(400).json({
        ok: false,
        msg: 'Usuario ya existe',
      });

      return;
    }

    const users = new UsersModel(req.body);

    //encriptar password
    const salt = bcryptjs.genSaltSync();
    users.password = bcryptjs.hashSync(password, salt);

    await users.save();

    const token = await generateJWT(users.id);

    res.status(201).json({
      ok: true,
      users,
      token,
      msg: 'addUsers',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'error inesperado',
    });
  }
};

const editUsers = async (req, res) => {
  const uid = req.params.id;

  try {
    const existUser = await UsersModel.findById(uid);

    if (!existUser) {
      return res.status(404).json({
        ok: false,
        msg: 'error, user no existe',
      });
    }

    const { password, google, email, ...fields } = req.body;
    //TODO: para mi, deberia de borrarse siempre el emial, para que no cambie.

    if (UsersModel.email === email) {
      delete fields.email;
    } else {
      const existEmail = await UsersModel.findOne({ email });

      if (existEmail) {
        return res.status(400).json({
          ok: false,
          msg: 'email, ya existe',
        });
      }
    }

    fields.email = email;
    delete fields.password;
    delete fields.google;

    const userEdit = await UsersModel.findByIdAndUpdate(uid, fields, { new: true });

    res.json({
      ok: true,
      msg: userEdit,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'error inesperado',
    });
  }
};

const deleteUsers = async (req, res = response) => {
  const uid = req.params.id;

  try {
    const existUser = await UsersModel.findById(uid);

    if (!existUser) {
      return res.status(404).json({
        ok: false,
        msg: 'error, user no existe',
      });
    }

    await UsersModel.findByIdAndDelete(uid);

    res.json({
      ok: true,
      msg: 'user eliminado correctamenete',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'error inesperado',
    });
  }
};

const search = async (req, res) => {
  const query = req.params.query;
  const regex = new RegExp(query, 'i');

  users = await UsersModel.find({ nombre: regex });

  res.status(201).json({
    ok: true,
    users: users,
    msg: 'search',
  });
};

module.exports = {
  getUsers,
  addUsers,
  editUsers,
  deleteUsers,
  search,
};

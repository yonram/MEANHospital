const { response } = require('express');
const MedicoModel = require('../models/medico.model');

const getMedico = async (req, res) => {
  const medico = await MedicoModel.find({}, 'nombre img user, hospital')
    .populate('hospital', 'nombre', 'Hospital')
    .populate('user', 'nombre img', 'User');

  res.status(201).json({
    ok: true,
    medico: medico,
    id: req.id,
    msg: 'getMedico',
  });
};

const addMedico = async (req, res = response) => {
  const { nombre } = req.body;
  const id = req.uid;

  try {
    const existMedico = await MedicoModel.findOne({ nombre });

    if (existMedico) {
      console.log('Medico ya existe');

      res.status(400).json({
        ok: false,
        msg: 'Medico ya existe',
      });

      return;
    }

    const medico = new MedicoModel({
      user: id,
      ...req.body,
    });
    await medico.save();

    res.status(201).json({
      ok: true,
      medico,
      msg: 'addMedico',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'error inesperado',
    });
  }
};

const editMedico = async (req, res) => {
  const id = req.params.id;

  try {
    const existMedico = await MedicoModel.findById(id);

    if (!existMedico) {
      return res.status(404).json({
        ok: false,
        msg: 'error, medico no existe',
      });
    }

    const { nombre, ...fields } = req.body;
    //TODO: para mi, deberia de borrarse siempre el nombre, para que no cambie.

    if (MedicoModel.nombre === nombre) {
      delete fields.nombre;
    } else {
      const existNombre = await MedicoModel.findOne({ nombre });

      if (existNombre) {
        return res.status(400).json({
          ok: false,
          msg: 'nombre, ya existe',
        });
      }
    }

    fields.nombre = nombre;
    const medicoEdit = await MedicoModel.findByIdAndUpdate(id, fields, { new: true });

    res.json({
      ok: true,
      msg: medicoEdit,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'error inesperado',
    });
  }
};

const deleteMedico = async (req, res = response) => {
  const id = req.params.id;

  try {
    const existMedico = await MedicoModel.findById(id);

    if (!existMedico) {
      return res.status(404).json({
        ok: false,
        msg: 'error, medico no existe',
      });
    }

    await MedicoModel.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: 'medico eliminado correctamenete',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'error inesperado',
    });
  }
};

module.exports = {
  getMedico,
  addMedico,
  editMedico,
  deleteMedico,
};

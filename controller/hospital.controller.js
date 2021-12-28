const { response } = require('express');
const HospitalModel = require('../models/hospital.model');

const getHospital = async (req, res) => {
  const hospital = await HospitalModel.find().populate('user', 'nombre img', 'User');

  res.status(201).json({
    ok: true,
    hospital: hospital,
    msg: 'getHospital',
  });
};

const addHospital = async (req, res = response) => {
  const { nombre } = req.body;
  const id = req.uid;

  try {
    const existHospital = await HospitalModel.findOne({ nombre });

    if (existHospital) {
      console.log('Hospital ya existe');

      res.status(400).json({
        ok: false,
        msg: 'Hospital ya existe',
      });

      return;
    }

    const hospital = new HospitalModel({
      user: id,
      ...req.body,
    });

    await hospital.save();

    res.status(201).json({
      ok: true,
      hospital,
      msg: 'addHospital',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'error inesperado',
    });
  }
};

const editHospital = async (req, res) => {
  const id = req.params.id;

  try {
    const existHospital = await HospitalModel.findById(id);

    if (!existHospital) {
      return res.status(404).json({
        ok: false,
        msg: 'error, hospital no existe',
      });
    }

    const { nombre, ...fields } = req.body;
    //TODO: para mi, deberia de borrarse siempre el nombre, para que no cambie.

    if (HospitalModel.nombre === nombre) {
      delete fields.nombre;
    } else {
      const existNombre = await HospitalModel.findOne({ nombre });

      if (existNombre) {
        return res.status(400).json({
          ok: false,
          msg: 'nombre, ya existe',
        });
      }
    }

    fields.nombre = nombre;
    const hospitalEdit = await HospitalModel.findByIdAndUpdate(id, fields, { new: true });

    res.json({
      ok: true,
      msg: hospitalEdit,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'error inesperado',
    });
  }
};

const deleteHospital = async (req, res = response) => {
  const id = req.params.id;

  try {
    const existHospital = await HospitalModel.findById(id);

    if (!existHospital) {
      return res.status(404).json({
        ok: false,
        msg: 'error, hospital no existe',
      });
    }

    await HospitalModel.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: 'hospital eliminado correctamenete',
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
  getHospital,
  addHospital,
  editHospital,
  deleteHospital,
};

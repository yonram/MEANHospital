const path = require('path');
const fs = require('fs');

const { response } = require('express');
const uuidv = require('uuid');
const { updateImg } = require('../helperds/update-img');

const fileUpload = async (req, res = response) => {
  const type = req.params.type;
  const id = req.params.id;

  const typeValid = ['hospital', 'medico', 'user'];
  if (!typeValid.includes(type)) {
    res.status(400).json({
      ok: false,
      msg: 'No tiene un tipo correcto',
    });
  }

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(201).json({
      ok: false,
      msg: 'No hay archivos',
    });
  }

  const file = req.files.img;
  const nameCut = file.name.split('.');
  const extention = nameCut[nameCut.length - 1];

  const extValidate = ['png', 'jpg', 'jpeg', 'gif'];

  if (!extValidate.includes(extention)) {
    res.status(400).json({
      ok: false,
      msg: 'No es un tipo de archivo valido',
    });
  }

  const nameFile = `${uuidv.v4()}.${extention}`;
  const path = `./upload/${type}/${nameFile}`;

  file.mv(path, async (error) => {
    if (error) {
      res.status(500).json({
        ok: false,
        msg: 'Problemas al cargar el archivo',
      });
    }

    await updateImg(type, id, nameFile);

    res.status(201).json({
      ok: true,
      nameFile,
      msg: `El archivo ${nameFile} fue cargado con exito`,
    });
  });
};

const getUpload = async (req, res = response) => {
  const type = req.params.type;
  const img = req.params.img;

  let pathImg = path.join(__dirname, `../upload/${type}/${img}`);

  if (fs.existsSync(pathImg)) {
    res.sendFile(pathImg);

    return;
  }

  pathImg = path.join(__dirname, '../upload/no-img.png');
  res.sendFile(pathImg);
};

module.exports = {
  fileUpload,
  getUpload,
};

const fs = require('fs');

const UsersModel = require('../models/user.model');
const MedicoModel = require('../models/medico.model');
const HospitalModel = require('../models/hospital.model');

const deleteImg = async (type, img) => {
  const patchOld = `./upload/${type}/${img}`;

  if (fs.existsSync(patchOld)) {
    // borrar la imagen anterior
    fs.unlinkSync(patchOld);
  }
};

const updateImg = async (type, id, nameFile) => {
  switch (type) {
    case 'medico':
      const medico = await MedicoModel.findById(id);
      if (!medico) {
        return false;
      }

      await deleteImg(type, medico.img);

      medico.img = nameFile;
      await medico.save();
      break;
    case 'hospital':
      const hospital = await HospitalModel.findById(id);

      if (!hospital) {
        return false;
      }

      await deleteImg(type, hospital.img);

      hospital.img = nameFile;
      await hospital.save();
      break;
    case 'user':
      const user = await UsersModel.findById(id);
      if (!user) {
        return false;
      }

      await deleteImg(type, user.img);

      user.img = nameFile;
      await user.save();
      break;
  }

  return true;
};

module.exports = {
  updateImg,
};

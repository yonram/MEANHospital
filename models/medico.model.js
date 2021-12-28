const { Schema, model } = require('mongoose');

const MedicoModel = Schema(
  {
    nombre: {
      type: String,
      require: true,
    },
    img: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      rel: 'User',
      require: true,
    },
    hospital: {
      type: Schema.Types.ObjectId,
      rel: 'Hospital',
      require: true,
    },
  },
  { collection: 'medicos' }
);

MedicoModel.method('toJSON', function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model('Medico', MedicoModel);

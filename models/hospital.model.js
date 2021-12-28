const { Schema, model } = require('mongoose');

const HospitalModel = Schema(
  {
    nombre: {
      type: String,
      require: true,
    },
    img: {
      type: String,
    },
    user: {
      require: true,
      type: Schema.Types.ObjectId,
      rel: 'User',
    },
  },
  { collection: 'hospitals' }
);

HospitalModel.method('toJSON', function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model('Hospital', HospitalModel);

const { Schema, model } = require('mongoose');

const UserModel = Schema({
  nombre: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    require: true,
    default: 'USER_ROLE',
  },
  google: {
    type: Boolean,
    default: false,
  },
});

UserModel.method('toJSON', function () {
  const { __v, _id, password, ...object } = this.toObject();

  object.id = _id;
  return object;
});

module.exports = model('User', UserModel);

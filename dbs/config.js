require('dotenv').config();
const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose
      .connect(process.env.DB_CNN, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(
        (result) => {
          console.log('dbs Online');
        },
        (err) => {
          console.log('error de conexion');
        }
      );
  } catch (error) {
    throw new Error('error en la conexion', error);
  }
};

module.exports = {
  dbConnection,
};

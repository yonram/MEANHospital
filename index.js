require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./dbs/config');

// --express
const app = express();

// --cors mdw
app.use(cors());

// --lectura body
app.use(express.json());

// --dataBase
dbConnection();

// --routes
app.use('/api/users', require('./routes/users.route'));
app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/hospital', require('./routes/hospital.route'));
app.use('/api/medico', require('./routes/medico.route'));
app.use('/api/upload', require('./routes/upload.route'));

// --listen
app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);

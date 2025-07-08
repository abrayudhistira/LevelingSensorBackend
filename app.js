const express    = require('express');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const sensorRoutes = require('./routes/sensor');
const db         = require('./models');
const app = express();

// body parser
app.use(bodyParser.json());

// init sequelize (config sesuai DB-mu)
const sequelize = new Sequelize('leveling_iot', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

// load models (jika generate via auto)
// const Sensor = require('./models/sensor')(sequelize, Sequelize.DataTypes);
// sequelize.models.Sensor = Sensor;

// test koneksi
db.sequelize.authenticate()
  .then(() => console.log('DB connected'))
  .catch(err => console.error('DB connection error:', err));

// pakai routes
app.use('/sensor', sensorRoutes);

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
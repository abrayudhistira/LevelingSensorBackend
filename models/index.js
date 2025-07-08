// models/index.js
const fs       = require('fs');
const path     = require('path');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('leveling_iot', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

const db = {};

// Baca semua file model di folder ini (kecuali index.js)
fs
  .readdirSync(__dirname)
  .filter(file => {
    return file.endsWith('.js') && file !== path.basename(__filename);
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

// Jika ada relasi/associate
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Export
db.sequelize = sequelize;
db.Sequelize = Sequelize;

const Data = require('./data')(sequelize, DataTypes);

module.exports = {
  sequelize,
  Data
};

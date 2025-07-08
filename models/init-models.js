var DataTypes = require("sequelize").DataTypes;
var _data = require("./data");

function initModels(sequelize) {
  var data = _data(sequelize, DataTypes);


  return {
    data,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;

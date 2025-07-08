// controllers/sensorController.js
const { Data } = require('../models');  // ganti Sensor jadi Data

exports.postSensor = async (req, res) => {
  try {
    const { status_leveling, atfullstate, distance } = req.body;
    const data = await Data.create({ status_leveling, atfullstate, distance });
    return res.status(201).json(data);
  } catch (err) {
    console.error('[postSensor]', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// exports.getSensor = async (req, res) => {
//   try {
//     const all = await Data.findAll({ order: [['id', 'DESC']] });
//     return res.json(all);
//   } catch (err) {
//     console.error('[getSensor]', err);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// };

exports.getSensor = async (req, res) => {
  try {
    const all = await Data.findAll({
      order: [['id', 'DESC']],
      attributes: ['id', 'status_leveling', 'atfullstate', 'distance'] // pastikan distance disertakan
    });
    return res.json(all);
  } catch (err) {
    console.error('[getSensor]', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
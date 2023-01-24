const patchConfig = require('../controller/config/patch');
const putConfig = require('../controller/config/put');
const getConfig = require('../controller/config/get');

exports.patch = function (req, res) {
  try {
    patchConfig(req.body);
    res.status(204).json();
    return;
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.put = async function (req, res) {
  try {
    await putConfig(req.body);

    res.status(204).json();
    return;
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.get = function (req, res) {
  try {
    const data = getConfig();
    res.json(data);
    return;
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

const getConfigFile = require('../../utils/getConfigFile');

function get() {
  return getConfigFile();
}

module.exports = get;

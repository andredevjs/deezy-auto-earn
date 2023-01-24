const fs = require('fs');

const validateSchema = require('../../utils/validateConfigSchema');
const getConfigFile = require('../../utils/getConfigFile');
const validateJSONObject = require('../../utils/validateJSONObject');
const { SAMPLE_FILE_PATH } = require('../../utils/constants');

function patch(configObject) {
  // eslint-disable-next-line import/no-dynamic-require, global-require
  const sampleConfig = require(SAMPLE_FILE_PATH);
  if (!validateJSONObject(configObject, sampleConfig)) {
    throw new Error('Invalid key');
  }

  const config = getConfigFile();

  const newConfig = { ...config, ...configObject };

  // Check that the new config is valid before we messed it up. It will throw an error if so.
  validateSchema(newConfig);

  fs.writeFileSync('./config.json', JSON.stringify(newConfig, null, 2));

  return newConfig;
}

module.exports = patch;

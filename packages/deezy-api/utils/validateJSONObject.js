function validateConfigObject(configObject, sampleConfig) {
  const validKeys = Object.keys(sampleConfig);

  const keys = Object.keys(configObject);

  const valid = keys.every((key) => validKeys.includes(key));
  return valid;
}

module.exports = validateConfigObject;

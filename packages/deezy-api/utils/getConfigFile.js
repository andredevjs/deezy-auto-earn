const fs = require('fs');
const { SAMPLE_FILE_PATH, CONFIG_FILE_PATH } = require('./constants');

function setDefaultConfig() {
  // eslint-disable-next-line import/no-dynamic-require, global-require
  const sampleConfig = require(SAMPLE_FILE_PATH);

  sampleConfig.TLS_CERT_PATH = process.env.TLS_CERT_PATH || sampleConfig.TLS_CERT_PATH;
  sampleConfig.MACAROON_PATH = process.env.MACAROON_PATH || sampleConfig.MACAROON_PATH;
  sampleConfig.SOCKET = `${process.env.APP_LIGHTNING_NODE_IP}:${process.env.APP_LIGHTNING_NODE_GRPC_PORT}` || sampleConfig.SOCKET;
  sampleConfig.TOR_PORT = Number(process.env.TOR_PORT) || sampleConfig.TOR_PORT;
  sampleConfig.TOR_HOST = process.env.TOR_HOST || sampleConfig.TOR_HOST;

  fs.writeFileSync(CONFIG_FILE_PATH, JSON.stringify(sampleConfig, null, 2));
}

function getConfigFile() {
  console.log(CONFIG_FILE_PATH, SAMPLE_FILE_PATH);
  if (!fs.existsSync(CONFIG_FILE_PATH)) {
    setDefaultConfig();
  }

  // eslint-disable-next-line import/no-dynamic-require, global-require
  const config = require(CONFIG_FILE_PATH);
  return config;
}

module.exports = getConfigFile;

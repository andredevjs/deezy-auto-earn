const fs = require('fs');
const { authenticatedLndGrpc, getChannels } = require('ln-service');

const { CONFIG_FILE_PATH } = require('../../utils/constants');

const validateSchema = require('../../utils/validateConfigSchema');

async function testLndConnection(configObject) {
  console.log(configObject);
  const c = {
    cert: fs.readFileSync(configObject.TLS_CERT_PATH, { encoding: 'base64' }),
    macaroon: fs.readFileSync(configObject.MACAROON_PATH, {
      encoding: 'base64',
    }),
    socket: configObject.SOCKET,
  };

  const DEEZY_PUBKEY = '024bfaf0cabe7f874fd33ebf7c6f4e5385971fc504ef3f492432e9e3ec77e1b5cf';
  const { lnd } = authenticatedLndGrpc(c);
  // If there is an error with the connection it will throw
  await getChannels({
    lnd,
    partner_public_key: DEEZY_PUBKEY,
  });
}

async function put(configObject) {
  console.log('PUTTING STUFf');
  validateSchema(configObject);
  // Let's validate if config is correct by connecting to the node
  await testLndConnection(configObject);

  fs.writeFileSync(CONFIG_FILE_PATH, JSON.stringify(configObject, null, 2));
}

module.exports = put;

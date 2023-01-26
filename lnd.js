const {
    authenticatedLndGrpc
} = require('ln-service');
const { logger } = require('./utils/logger');
const fs = require('fs')
const config = require('./config/config.json')
const os = require('os');
const HOME_PATH = os.homedir()

const c = {
    cert: config.OMIT_TLS_CERT
      ? undefined
      : fs.readFileSync(config.TLS_CERT_PATH || `${HOME_PATH}/.lnd/tls.cert`, { encoding: 'base64' }),
    macaroon: fs.readFileSync(config.MACAROON_PATH || `${HOME_PATH}/.lnd/data/chain/bitcoin/mainnet/admin.macaroon`, {
      encoding: 'base64',
    }),
    socket: config.SOCKET || 'localhost:1001',
  };

logger.debug('Lnd configuration', { data: c });

const { lnd } = authenticatedLndGrpc(c);

module.exports = { lnd }
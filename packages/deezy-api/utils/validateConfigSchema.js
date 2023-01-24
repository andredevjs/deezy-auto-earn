/* eslint-disable no-prototype-builtins */
// Move to a better solution like using avj or something, meanwhile let's keep it lean
function validateSchema(schema) {
  if (!schema.hasOwnProperty('CLOSE_WHEN_CHANNEL_EXCEEDS_RATIO') || typeof schema.CLOSE_WHEN_CHANNEL_EXCEEDS_RATIO !== 'number') {
    throw new Error('CLOSE_WHEN_CHANNEL_EXCEEDS_RATIO key is missing or not a number');
  }
  if (!schema.hasOwnProperty('DEEZY_CHANNEL_SIZE_SATS') || typeof schema.DEEZY_CHANNEL_SIZE_SATS !== 'number') {
    throw new Error('DEEZY_CHANNEL_SIZE_SATS key is missing or not a number');
  }
  if (!schema.hasOwnProperty('OPEN_CHANNEL_WHEN_LOCAL_SATS_BELOW') || typeof schema.OPEN_CHANNEL_WHEN_LOCAL_SATS_BELOW !== 'number') {
    throw new Error('OPEN_CHANNEL_WHEN_LOCAL_SATS_BELOW key is missing or not a number');
  }
  if (!schema.hasOwnProperty('PRIVATE_CHANNEL') || typeof schema.PRIVATE_CHANNEL !== 'boolean') {
    throw new Error('PRIVATE_CHANNEL key is missing or not a boolean');
  }
  if (!schema.hasOwnProperty('MAX_CHANNEL_OPEN_FEE_SATS_PER_VBYTE') || typeof schema.MAX_CHANNEL_OPEN_FEE_SATS_PER_VBYTE !== 'number') {
    throw new Error('MAX_CHANNEL_OPEN_FEE_SATS_PER_VBYTE key is missing or not a number');
  }
  if (!schema.hasOwnProperty('TLS_CERT_PATH') || typeof schema.TLS_CERT_PATH !== 'string') {
    throw new Error('TLS_CERT_PATH key is missing or not a string');
  }
  if (!schema.hasOwnProperty('MACAROON_PATH') || typeof schema.MACAROON_PATH !== 'string') {
    throw new Error('MACAROON_PATH key is missing or not a string');
  }
  if (!schema.hasOwnProperty('SOCKET') || typeof schema.SOCKET !== 'string') {
    throw new Error('SOCKET key is missing or not a string');
  }
  if (!schema.hasOwnProperty('TOR_PORT') || typeof schema.TOR_PORT !== 'number') {
    throw new Error('TOR_PORT key is missing or not a number');
  }
  if (!schema.hasOwnProperty('TOR_HOST') || typeof schema.TOR_HOST !== 'string') {
    throw new Error('TOR_HOST key is missing or not a string');
  }

  if (!schema.hasOwnProperty('DESTINATIONS') || !Array.isArray(schema.DESTINATIONS)) {
    throw new Error('DESTINATIONS key is missing or not an array');
  }

  for (let i = 0; i < schema.DESTINATIONS.length; i++) {
    const destination = schema.DESTINATIONS[i];
    if (!destination.hasOwnProperty('TYPE') || typeof destination.TYPE !== 'string') {
      throw new Error('TYPE key is missing or not a string');
    }
    if (destination.TYPE === 'LNURL') {
      if (!destination.hasOwnProperty('LNURL_OR_ADDRESS') || typeof destination.LNURL_OR_ADDRESS !== 'string') {
        throw new Error('LNURL_OR_ADDRESS key is missing or not a string');
      }
      if (!destination.hasOwnProperty('MAX_ROUTE_FEE_PPM') || typeof destination.MAX_ROUTE_FEE_PPM !== 'number') {
        throw new Error('MAX_ROUTE_FEE_PPM key is missing or not a number');
      }
      if (!destination.hasOwnProperty('PAYMENT_AMOUNT_SATS') || typeof destination.PAYMENT_AMOUNT_SATS !== 'number') {
        throw new Error('PAYMENT_AMOUNT_SATS key is missing or not a number');
      }
    } else if (destination.TYPE === 'BITFINEX') {
      if (!destination.hasOwnProperty('API_KEY') || typeof destination.API_KEY !== 'string') {
        throw new Error('API_KEY key is missing or not a string');
      }
      if (!destination.hasOwnProperty('API_SECRET') || typeof destination.API_SECRET !== 'string') {
        throw new Error('API_SECRET key is missing or not a string');
      }
      if (!destination.hasOwnProperty('MAX_ROUTE_FEE_PPM') || typeof destination.MAX_ROUTE_FEE_PPM !== 'number') {
        throw new Error('MAX_ROUTE_FEE_PPM key is missing or not a number');
      }
      if (!destination.hasOwnProperty('PAYMENT_AMOUNT_SATS') || typeof destination.PAYMENT_AMOUNT_SATS !== 'number') {
        throw new Error('PAYMENT_AMOUNT_SATS key is missing or not a number');
      }
      if (!destination.hasOwnProperty('AUTO_WITHDRAW') || typeof destination.AUTO_WITHDRAW !== 'boolean') {
        throw new Error('AUTO_WITHDRAW key is missing or not a boolean');
      }
      if (!destination.hasOwnProperty('ON_CHAIN_WITHDRAWAL_TARGET_SIZE_SATS') || typeof destination.ON_CHAIN_WITHDRAWAL_TARGET_SIZE_SATS !== 'number') {
        throw new Error('ON_CHAIN_WITHDRAWAL_TARGET_SIZE_SATS key is missing or not a number');
      }
      if (!destination.hasOwnProperty('ON_CHAIN_WITHDRAWAL_ADDRESS') || typeof destination.ON_CHAIN_WITHDRAWAL_ADDRESS !== 'string') {
        throw new Error('ON_CHAIN_WITHDRAWAL_ADDRESS key is missing or not a string');
      }
    } else {
      throw new Error('TYPE key is not LNURL or BITFINEX');
    }
  }
}

module.exports = validateSchema;

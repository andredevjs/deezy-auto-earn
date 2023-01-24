export interface LNDConfigDestination {
  TYPE: string;
  LNURL_OR_ADDRESS: string;
  MAX_ROUTE_FEE_PPM: number;
  PAYMENT_AMOUNT_SATS: number;
  API_KEY?: string;
  API_SECRET?: string;
  AUTO_WITHDRAW?: boolean;
  ON_CHAIN_WITHDRAWAL_TARGET_SIZE_SATS?: number;
  ON_CHAIN_WITHDRAWAL_ADDRESS?: string;
}

export interface LNDSettings {
  TLS_CERT_PATH: string;
  MACAROON_PATH: string;
  SOCKET: string;
  TOR_PORT: number;
  TOR_HOST: string;
}

export interface LNDConfig extends LNDSettings {
  CLOSE_WHEN_CHANNEL_EXCEEDS_RATIO: number;
  DEEZY_CHANNEL_SIZE_SATS: number;
  OPEN_CHANNEL_WHEN_LOCAL_SATS_BELOW: number;
  PRIVATE_CHANNEL: boolean;
  MAX_CHANNEL_OPEN_FEE_SATS_PER_VBYTE: number;
  DESTINATIONS: Array<LNDConfigDestination>;
}

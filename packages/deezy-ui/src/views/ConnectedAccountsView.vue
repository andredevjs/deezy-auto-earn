<script lang="ts">
import type { LNDConfig, LNDConfigDestination } from "@/domain/deezyEarnConfig";
import DeezyConfigDataService from "@/services/DeezyConfigDataService";
import LocalStorage, { LocalStorageKeys } from "@/services/LocalStorage";

interface Data {
  config?: LNDConfig;
  destinationConfig?: LNDConfigDestination;
  showAdvance?: boolean;
  TLS_CERT_PATH: string;
  MACAROON_PATH: string;
  APP_LIGHTNING_NODE_IP: string;
  APP_LIGHTNING_NODE_GRPC_PORT: string;
  TOR_HOST: string;
  TOR_PORT: string;
  SOCKET: string;
}

const data: Data = {
  config: undefined,
  destinationConfig: undefined,
  showAdvance: false,
  // This config comes from .env file
  TLS_CERT_PATH: import.meta.env.VITE_TLS_CERT_PATH,
  MACAROON_PATH: import.meta.env.VITE_MACAROON_PATH,
  APP_LIGHTNING_NODE_IP: import.meta.env.VITE_APP_LIGHTNING_NODE_IP,
  APP_LIGHTNING_NODE_GRPC_PORT: import.meta.env
    .VITE_APP_LIGHTNING_NODE_GRPC_PORT,
  TOR_HOST: import.meta.env.VITE_TOR_HOST,
  TOR_PORT: import.meta.env.VITE_TOR_PORT,
  SOCKET: import.meta.env.VITE_SOCKET,
};

export default {
  name: "App",
  data() {
    return data;
  },
  mounted() {
    this.getDeezyConfig();

    this.showAdvance = Boolean(
      LocalStorage.get(LocalStorageKeys.SHOW_ADVANCE_OPTIONS)
    );
  },
  methods: {
    async getDeezyConfig() {
      const result = await DeezyConfigDataService.getAll();
      this.config = result.data;
      this.destinationConfig = this.config?.DESTINATIONS?.find(
        (x: LNDConfigDestination) => x.TYPE === "LNURL"
      );
    },
    async updateConfig() {
      if (this.config) {
        await DeezyConfigDataService.update(this.config);
      }
    },
    handleShowAdvance() {
      LocalStorage.set(LocalStorageKeys.SHOW_ADVANCE_OPTIONS, this.showAdvance);
    },
  },
};
</script>

<template>
  <div class="settings" v-if="config">
    <form @submit.prevent="updateConfig()">
      <legend>{{ MACAROON_PATH }}</legend>

      <div class="form-check form-switch mb-3">
        <input
          class="form-check-input"
          type="checkbox"
          id="flexSwitchCheckDefault"
          v-model="showAdvance"
          @change="handleShowAdvance()"
        />
        <label class="form-check-label" for="flexSwitchCheckDefault"
          >Show advance options</label
        >
      </div>

      <div class="card mb-3" v-if="destinationConfig">
        <div class="card-body">
          <div class="card-title">Destination</div>
          <div class="mb-3">
            <label for="destinationAddress" class="form-label"
              >LNURL or Address</label
            >
            <input
              class="form-control"
              id="destinationAddress"
              aria-describedby="destinationAddressHelp"
              v-model="destinationConfig.LNURL_OR_ADDRESS"
            />
            <div id="destinationAddressHelp" class="form-text">
              Destination address or LNURL
            </div>
          </div>
          <Transition>
            <div v-show="showAdvance">
              <div class="mb-3">
                <label for="Max fee" class="form-label">Max fee</label>
                <input
                  type="number"
                  class="form-control"
                  id="Max fee"
                  aria-describedby="Max feeHelp"
                  v-model="destinationConfig.MAX_ROUTE_FEE_PPM"
                />
                <div id="Max feeHelp" class="form-text">Max route fee ppm</div>
              </div>

              <div class="mb-3">
                <label for="paymentAmountSats" class="form-label"
                  >Payment amount</label
                >
                <input
                  type="number"
                  class="form-control"
                  id="paymentAmountSats"
                  aria-describedby="paymentAmountSatsHelp"
                  v-model="destinationConfig.PAYMENT_AMOUNT_SATS"
                />
                <div id="paymentAmountSatsHelp" class="form-text">
                  Payment amount in sats
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>

      <Transition>
        <div class="card mb-3" v-show="showAdvance">
          <div class="card-body">
            <div class="card-title">Channel settings</div>

            <div class="mb-3">
              <label for="closeChannelRatio" class="form-label"
                >Close channel ratio</label
              >
              <input
                type="number"
                step=".01"
                min="0.01"
                class="form-control"
                id="closeChannelRatio"
                aria-describedby="closeChannelRatioHelp"
                v-model="config.CLOSE_WHEN_CHANNEL_EXCEEDS_RATIO"
              />
              <div id="closeChannelRatioHelp" class="form-text">
                Close channel when exceeeding this ratio
              </div>
            </div>

            <div class="mb-3">
              <label for="channelSize" class="form-label">Channel size</label>
              <input
                type="number"
                class="form-control"
                id="channelSize"
                aria-describedby="channelSizeHelp"
                v-model="config.DEEZY_CHANNEL_SIZE_SATS"
              />
              <div id="channelSizeHelp" class="form-text">
                Deezy channel size in sats
              </div>
            </div>

            <div class="mb-3">
              <label for="openChannel" class="form-label"
                >Open Channel size</label
              >
              <input
                type="number"
                class="form-control"
                id="openChannel"
                aria-describedby="openChannelHelp"
                v-model="config.OPEN_CHANNEL_WHEN_LOCAL_SATS_BELOW"
              />
              <div id="openChannelHelp" class="form-text">
                Open channel when local sats are below this value
              </div>
            </div>

            <div class="mb-3">
              <label for="maxFeeSats" class="form-label">Max fee</label>
              <input
                type="number"
                class="form-control"
                id="maxFeeSats"
                aria-describedby="maxFeeSatsHelp"
                v-model="config.MAX_CHANNEL_OPEN_FEE_SATS_PER_VBYTE"
              />
              <div id="maxFeeSatsHelp" class="form-text">
                Max channel open fee sats per vbyte
              </div>
            </div>

            <div class="mb-3 form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="privateChannel"
                v-model="config.PRIVATE_CHANNEL"
              />
              <label class="form-check-label" for="privateChannel"
                >Private channel</label
              >
            </div>
          </div>
        </div>
      </Transition>

      <button class="btn btn-primary" type="submit">Save</button>
    </form>
  </div>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

@media (min-width: 1024px) {
  .settings {
    display: flex;
    flex-direction: column;
  }
}
</style>

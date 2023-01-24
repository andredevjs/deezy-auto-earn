<script lang="ts">
import type { LNDConfig } from "@/domain/deezyEarnConfig";
import DeezyConfigDataService from "@/services/DeezyConfigDataService";
import LocalStorage, { LocalStorageKeys } from "@/services/LocalStorage";

interface Data {
  config?: LNDConfig;
  _initialConfig?: LNDConfig;
  showAdvance?: boolean;
}

const data: Data = {
  config: undefined,
  _initialConfig: undefined,
  showAdvance: false,
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

      // TODO: Set values explicity
      this.config = result.data;
      this._initialConfig = result.data;
    },
    async updateConfig() {
      if (this.config) {
        try {
          await DeezyConfigDataService.update(this.config);
        } catch (e: any) {
          const msg = e.response.data.message
            ? e.response.data.message
            : "Something went wrong";
          alert(msg); // TODO: Use toast, and be able to identify the field that failed.
        }
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
      <legend>Settings</legend>

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

      <div class="card mb-3" v-show="showAdvance">
        <div class="card-body">
          <div class="card-title">Lighting settings</div>
          <div class="mb-3">
            <label for="tlsCertPath" class="form-label"
              >TLS Certificate Path</label
            >
            <input
              class="form-control"
              id="tlsCertPath"
              aria-describedby="tlsCertPathHelp"
              v-model="config.TLS_CERT_PATH"
              placeholder="/lnd/tls.cert"
            />
            <div id="tlsCertPathHelp" class="form-text">Certificate path</div>
          </div>

          <div class="mb-3">
            <label for="macaroonPath" class="form-label">Macaroon Path</label>
            <input
              class="form-control"
              id="macaroonPath"
              aria-describedby="macaroonPathHelp"
              v-model="config.MACAROON_PATH"
              placeholder="/lnd/data/chain/bitcoin/mainnet/admin.macaroon"
            />
            <div id="macaroonPathHelp" class="form-text">Macaroon Path</div>
          </div>

          <div class="mb-3">
            <label for="socket" class="form-label">Socket</label>
            <input
              class="form-control"
              id="socket"
              aria-describedby="socketHelp"
              v-model="config.SOCKET"
              placeholder="0.0.0.0:10009"
            />
            <div id="socketHelp" class="form-text">
              Lighting socket host:port
            </div>
          </div>

          <div class="mb-3">
            <label for="torHost" class="form-label">Tor Host</label>
            <input
              class="form-control"
              id="torHost"
              aria-describedby="torHostHelp"
              v-model="config.TOR_HOST"
              placeholder="0.0.0.0"
            />
          </div>

          <div class="mb-3">
            <label for="torHost" class="form-label">Tor Port</label>
            <input
              type="number"
              class="form-control"
              id="torPort"
              aria-describedby="torPortHelp"
              v-model="config.TOR_PORT"
              placeholder="9050"
            />
          </div>
        </div>
      </div>

      <div class="card mb-3">
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

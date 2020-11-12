<template>
  <div>
    <bounce-loader
      :loading="isloading"
      :color="'#68d391'"
      :size="100"
    ></bounce-loader>
    <template v-if="!isloading">
      <div class="w-full flex flex-col sm:flex-row justify-around items-center">
        <div class="flex flex-col items-center">
          <img
            :src="
              `https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`
            "
            :alt="asset.name"
            class="w-20 h-20 mr-5"
          />
          <h1 class="text-5xl">
            {{ asset.name }}
            <small class="sm:mr-2 text-gray-500"></small>
          </h1>
        </div>
        <div class="my-10 flex flex-col">
          <ul>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Ranking</b>
              <span>#{{ asset.rank }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio actual</b>
              <span>{{ dollarFilter(asset.priceUsd) }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio más bajo</b>
              <span>{{ dollarFilter(min) }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio más alto</b>
              <span>{{ dollarFilter(max) }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio Promedio</b>
              <span>{{ dollarFilter(avg) }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Variación 24hs</b>
              <span>{{ percentFilter(asset.changePercent24Hr) }}</span>
            </li>
          </ul>
        </div>
        <div class="my-10 sm:mt-0 flex flex-col justify-center text-center">
          <button
            v-on:click="toggleConverter"
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            {{ fromUsd ? `USD a ${asset.symbol}` : `${asset.symbol} a USD` }}
          </button>
          <div class="flex flex-row my-5">
            <label class="w-full" for="convertValue">
              <input
                v-model="convertValue"
                id="convertValue"
                type="number"
                class="text-center bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                :placeholder="
                  fromUsd ? `Valor en USD` : `Valor en ${asset.symbol}`
                "
              />
            </label>
          </div>
          <span class="text-xl">
            {{ convertResult }}
          </span>
        </div>
      </div>
      <line-chart
        class="my-10"
        :colors="['orange']"
        :min="min"
        :max="max"
        :data="history.map(h => [h.date, parseFloat(h.priceUsd).toFixed(2)])"
      ></line-chart>
      <h3 class="text-xl my-10">Mejores Ofertas de Cambio</h3>
      <table>
        <tr
          class="border-b"
          v-for="change in market"
          :key="`${change.exchangeId}-${change.priceUsd}`"
        >
          <td>
            <b>{{ change.exchangeId }}</b>
          </td>
          <td>{{ dollarFilter(change.priceUsd) }}</td>
          <td>{{ change.baseSymbol }}/{{ change.quoteSymbol }}</td>
          <td>
            <px-button
              :is-loading="change.loading || false"
              v-if="!change.url"
              v-on:custom-event="getWebSite(change)"
            >
              <slot>Obtener link</slot>
            </px-button>
            <a
              v-else
              :href="change.url"
              class="hover:underline text-green-600"
              target="_blank"
            >
              {{ change.url }}
            </a>
          </td>
        </tr>
      </table>
    </template>
  </div>
</template>

<script>
import api from '@/api';
import { dollarFilter, percentFilter } from '@/filters';
import pxButton from '@/components/pxButton';
export default {
  name: 'CoinDetail',
  data() {
    return {
      asset: {},
      history: [],
      market: [],
      dollarFilter,
      percentFilter,
      isloading: false,
      fromUsd: true,
      convertValue: null
    };
  },
  components: {
    pxButton
  },
  computed: {
    min() {
      return Math.min(
        ...this.history.map(h => parseFloat(h.priceUsd).toFixed(2))
      );
    },
    max() {
      return Math.max(
        ...this.history.map(h => parseFloat(h.priceUsd).toFixed(2))
      );
    },
    avg() {
      return this.history.reduce(
        (acum, h) => acum + parseFloat(h.priceUsd) / this.history.length,
        0
      );
    },
    convertResult() {
      if (!this.convertValue) {
        return 0;
      }
      const result = this.fromUsd
        ? this.convertValue / this.asset.priceUsd
        : this.asset.priceUsd / this.convertValue;
      return result.toFixed(4);
    }
  },
  methods: {
    getCoin() {
      this.isloading = true;
      const coinId = this.$route.params.id;
      Promise.all([
        api.getAsset(coinId),
        api.getAssetHistory(coinId),
        api.getMarket(coinId)
      ])
        .then(([asset, history, market]) => {
          this.asset = asset;
          this.history = history;
          this.market = market;
        })
        .finally(() => (this.isloading = false));
    },
    getWebSite(exchange) {
      this.$set(exchange, 'loading', true);
      return api
        .getExchange(exchange.exchangeId)
        .then(r => {
          //exchange.url = r.exchangeUrl; Funciona en Vue 3+
          this.$set(exchange, 'url', r.exchangeUrl); // Vue 2
        })
        .finally(() => this.$set(exchange, 'loading', false));
    },
    toggleConverter() {
      this.fromUsd = !this.fromUsd;
    }
  },
  watch: {
    $route() {
      this.getCoin();
    }
  },
  created() {
    this.getCoin();
  }
};
</script>

<style scoped>
td {
  padding: 10px;
  text-align: center;
}
</style>

<template>
  <table>
    <thead>
      <tr class="bg-gray-100 border-b-2 border-gray-400">
        <th></th>
        <th
          :class="{
            up: this.sortOrder === 1,
            down: this.sortOrder === -1
          }"
        >
          <span
            class="hover:underline cursor-pointer"
            v-on:click="changeSortOrder"
          >
            Ranking
          </span>
        </th>
        <th>Nombre</th>
        <th>Precio</th>
        <th>Cap. de Mercado</th>
        <th>Variación 24hs</th>
        <td class="hidden sm:block">
          <input
            class="bg-gray-100 focus:outline-none border-b border-gray-400 py-2 px-4 block w-full appearance-none leading-normal"
            id="filter"
            placeholder="Buscar..."
            type="text"
            v-model="filter"
          />
        </td>
      </tr>
    </thead>
    <tbody>
      <tr
        class="border-b border-gray-200 hover:bg-orange-100"
        v-for="asset in filterAssets"
        :key="asset.id"
      >
        <td>
          <img
            :src="
              `https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`
            "
            :alt="asset.name"
            class="w-16"
          />
        </td>
        <td>#{{ asset.rank }}</td>
        <td>
          <router-link
            class="hover:underline hover:text-green-600"
            :to="{
              name: 'coin-detail',
              params: { id: asset.id }
            }"
          >
            {{ asset.name }}
          </router-link>
        </td>
        <td>{{ dollarFilter(asset.priceUsd) }}</td>
        <td>{{ dollarFilter(asset.marketCapUsd) }}</td>
        <td
          :class="
            asset.changePercent24Hr.includes('-')
              ? 'text-red-600'
              : 'text-green-600'
          "
        >
          {{ percentFilter(asset.changePercent24Hr) }}
        </td>
        <td>
          <px-button v-on:custom-event="goToCoin(asset.id)">
            <span>Detalle</span>
          </px-button>
        </td>
        <td class="hidden sm:block"></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { dollarFilter, percentFilter } from '@/filters';
import pxButton from '@/components/pxButton';
export default {
  name: 'pxAssetsTable',
  props: {
    assets: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      dollarFilter,
      percentFilter,
      filter: '',
      sortOrder: 1
    };
  },
  computed: {
    filterAssets() {
      const altOrder = this.sortOrder === 1 ? -1 : 1;
      return this.assets
        .filter(
          f =>
            f.name.toLowerCase().includes(this.filter.toLowerCase()) ||
            f.symbol.toLowerCase().includes(this.filter.toLowerCase())
        )
        .sort((a, b) => {
          if (parseInt(a.rank) > parseInt(b.rank)) {
            return this.sortOrder;
          }
          return altOrder;
        });
    }
  },
  methods: {
    goToCoin(id) {
      this.$router.push({
        name: 'coin-detail',
        params: { id }
      });
    },
    changeSortOrder() {
      this.sortOrder = this.sortOrder === 1 ? -1 : 1;
    }
  },
  components: {
    pxButton
  }
};
</script>

<style scoped>
.up::before {
  content: '👆';
}

.down::before {
  content: '👇';
}

td {
  padding: 20px 0px;
  font-size: 0.6rem;
  text-align: center;
}

th {
  padding: 5px;
  font-size: 0.6rem;
}

@media (min-width: 640px) {
  td,
  th {
    padding: 20px;
    font-size: 1rem;
  }

  th {
    padding: 12px;
  }
}
</style>

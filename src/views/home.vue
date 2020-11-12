<template>
  <div>
    <bounce-loader
      :loading="isloading"
      :color="'#68d391'"
      :size="100"
    ></bounce-loader>
    <px-assets-table v-if="!isloading" :assets="assets"></px-assets-table>
  </div>
</template>

<script>
import pxAssetsTable from '@/components/pxAssetsTable';
import api from '@/api.js';
export default {
  name: 'home',
  data() {
    return {
      assets: [],
      isloading: false
    };
  },
  components: {
    pxAssetsTable
  },
  created() {
    this.isloading = true;
    api
      .getAssets()
      .then(r => (this.assets = r))
      .finally(() => (this.isloading = false));
  }
};
</script>

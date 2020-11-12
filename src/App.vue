<template>
  <main>
    <px-header :links-header="links"></px-header>
    <router-view
      class="container px-5 sm:px-20 py-20 flex flex-col justify-center"
    ></router-view>
  </main>
</template>

<script>
import pxHeader from '@/components/pxHeader';
export default {
  name: 'App',
  data() {
    return {
      links: [
        {
          title: 'BTC',
          to: { name: 'coin-detail', params: { id: 'bitcoin' } }
        },
        {
          title: 'ETH',
          to: { name: 'coin-detail', params: { id: 'ethereum' } }
        },
        {
          title: 'USDT',
          to: { name: 'coin-detail', params: { id: 'tether' } }
        }
      ]
    };
  },
  components: {
    pxHeader
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

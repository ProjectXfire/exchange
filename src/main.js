import Vue from 'vue';
import App from './App.vue';
import '@/assets/css/tailwind.css';
import router from '@/router';
import chartkick from 'vue-chartkick';
import { VueSpinners } from '@saeris/vue-spinners';
import chart from 'chart.js';

Vue.use(VueSpinners);
Vue.use(chartkick.use(chart));
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');

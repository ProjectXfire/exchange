import vue from 'vue';
import router from 'vue-router';

import home from '@/views/home';
import about from '@/views/about';
import coin from '@/views/coinDetail';
import error from '@/views/error';

vue.use(router);

export default new router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/about',
      name: 'about',
      component: about
    },
    {
      path: '/coin/:id',
      name: 'coin-detail',
      component: coin
    },
    {
      path: '*',
      name: 'error',
      component: error
    }
  ]
});

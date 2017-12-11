import Vue from 'vue';
import Router from 'vue-router';
import Feelings from '@/components/Feelings';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Feelings',
      component: Feelings,
    },
  ],
});

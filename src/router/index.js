import Vue from 'vue';
import Router from 'vue-router';
import Feelings from '@/components/Feelings';
import Login from '@/components/Login';
import { requireAuth } from '../utils/auth';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/',
      name: 'Feelings',
      beforeEnter: requireAuth,
      component: Feelings,
    },
  ],
});

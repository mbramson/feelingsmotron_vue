import Vue from 'vue';
import Router from 'vue-router';
import Feelings from '@/components/Feelings';
import Login from '@/components/Login';
import Signup from '@/components/Signup';

Vue.use(Router);

const redirectIfNotAuthorized = (to, from, next) => {
  if (this.a.app.$store && this.a.app.$store.getters.isLoggedIn) {
    next();
  } else {
    next('/login');
  }
};

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
    },
    {
      path: '/',
      name: 'Feelings',
      beforeEnter: redirectIfNotAuthorized,
      component: Feelings,
    },
  ],
});

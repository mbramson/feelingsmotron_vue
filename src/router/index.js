import Vue from 'vue';
import Vuex from 'vuex';
import Router from 'vue-router';
import Feelings from '@/components/Feelings';
import Login from '@/components/Login';
import Signup from '@/components/Signup';
import Profile from '@/components/Profile';
import ProfileUpdate from '@/components/ProfileUpdate';
import store from '../store';

Vue.use(Vuex);
Vue.use(Router);

const redirectIfNotAuthorized = (to, from, next) => {
  const loggedIn = !!store.state.auth.jwt;
  if (loggedIn) {
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
    {
      path: '/profile',
      name: 'Profile',
      beforeEnter: redirectIfNotAuthorized,
      component: Profile,
    },
    {
      path: '/profile/update',
      name: 'ProfileUpdate',
      beforeEnter: redirectIfNotAuthorized,
      component: ProfileUpdate,
    },
  ],
});

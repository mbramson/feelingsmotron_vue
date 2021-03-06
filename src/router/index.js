import Vue from 'vue';
import Vuex from 'vuex';
import Router from 'vue-router';
import Feelings from '@/components/Feelings';
import GroupIndex from '@/components/groups/GroupIndex';
import GroupOverview from '@/components/groups/GroupOverview';
import GroupCreate from '@/components/groups/GroupCreate';
import GroupSettings from '@/components/groups/GroupSettings';
import Login from '@/components/Login';
import Signup from '@/components/Signup';
import Profile from '@/components/profile/Profile';
import ProfileUpdate from '@/components/profile/ProfileUpdate';
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

const router = new Router({
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
    {
      path: '/groups',
      name: 'GroupIndex',
      beforeEnter: redirectIfNotAuthorized,
      component: GroupIndex,
    },
    {
      path: '/groups/new',
      name: 'GroupCreate',
      beforeEnter: redirectIfNotAuthorized,
      component: GroupCreate,
    },
    {
      path: '/groups/:id/settings',
      name: 'GroupSettings',
      beforeEnter: redirectIfNotAuthorized,
      component: GroupSettings,
    },
    {
      path: '/groups/:id',
      name: 'GroupOverview',
      beforeEnter: redirectIfNotAuthorized,
      component: GroupOverview,
    },
  ],
});

router.afterEach(() => {
  if (store.getters.errorResponses.length > 0) {
    store.dispatch('clearErrors');
  }
});

export default router;

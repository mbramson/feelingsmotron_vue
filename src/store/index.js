import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import auth from './modules/auth';
import errors from './modules/errors';
import form from './modules/form';
import groups from './modules/groups';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    auth,
    errors,
    form,
    groups,
  },
  plugins: [
    createPersistedState({
      secure: true,
      paths: ['auth'],
    }),
  ],
});

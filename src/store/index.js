import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import auth from './modules/auth';
import groups from './modules/groups';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    auth,
    groups,
  },
  plugins: [
    createPersistedState({
      secure: true,
    }),
  ],
});

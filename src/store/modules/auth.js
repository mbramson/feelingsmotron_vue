import * as types from '../mutation-types';

const state = {
  jwt: null,
  user_name: null,
  user_id: null,
};

const getters = {
  jwt: () => state.jwt,
  user_name: () => state.user_name,
  user_id: () => state.user_id,
  isLoggedIn: () => !!state.jwt,
};

const actions = {
  login({ commit }, user) {
    commit(types.LOGIN_USER, user);
  },
  logout({ commit }) {
    commit(types.LOGOUT);
  },
};

const mutations = {
  [types.LOGIN_USER](storeState, user) {
    state.jwt = user.jwt;
    state.user_name = user.name;
    state.user_id = user.id;
  },

  [types.LOGOUT]() {
    state.jwt = null;
    state.user_name = null;
    state.user_id = null;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

import * as types from '../mutation-types';

const state = {
  jwt: null,
  user_name: null,
  user_id: null,
};

const getters = {
  jwt: state => state.jwt,
  user_name: state => state.user_name,
  user_id: state => state.user_id,
  isLoggedIn: state => !!state.jwt,
  requestHeaders: state => ({
    headers: {
      Authorization: `Bearer ${state.jwt}`,
    },
  }),
};

const actions = {
  login({ commit }, user) {
    commit(types.LOGIN_USER, user);
  },
  logout({ commit }) {
    commit(types.LOGOUT);
  },
  pull_auth_from_storage({ commit }, auth) {
    commit(types.PULL_AUTH_FROM_STORAGE, auth);
  },
  updateCurrentUserName({ commit }, name) {
    commit(types.UPDATE_CURRENT_USER_NAME, name);
  },
};

const mutations = {
  [types.LOGIN_USER](storeState, user) {
    state.jwt = user.jwt;
    state.user_name = user.name;
    state.user_id = user.id;
    storeState.jwt = user.jwt;
    storeState.user_name = user.name;
    storeState.user_id = user.id;
  },

  [types.LOGOUT](storeState) {
    state.jwt = null;
    state.user_name = null;
    state.user_id = null;
    storeState.jwt = null;
    storeState.user_name = null;
    storeState.user_id = null;
  },

  [types.PULL_AUTH_FROM_STORAGE](storeState, auth) {
    state.jwt = auth.jwt;
    state.user_name = auth.user_name;
    state.user_id = auth.user_id;
    storeState.jwt = auth.jwt;
    storeState.user_name = auth.user_name;
    storeState.user_id = auth.user_id;
  },

  [types.UPDATE_CURRENT_USER_NAME](storeState, name) {
    storeState.user_name = name;
    state.user_name = name;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

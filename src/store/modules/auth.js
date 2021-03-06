import * as types from '../mutation-types';

const getters = {
  jwt: state => state.jwt,
  user_name: state => state.user_name,
  user_id: state => state.user_id,
  currentUser: state => ({
    id: state.user_id,
    name: state.user_name,
  }),
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
  [types.LOGIN_USER](state, user) {
    state.jwt = user.jwt;
    state.user_name = user.name;
    state.user_id = user.id;
  },

  [types.LOGOUT](state) {
    state.jwt = null;
    state.user_name = null;
    state.user_id = null;
  },

  [types.PULL_AUTH_FROM_STORAGE](state, auth) {
    state.jwt = auth.jwt;
    state.user_name = auth.user_name;
    state.user_id = auth.user_id;
  },

  [types.UPDATE_CURRENT_USER_NAME](state, name) {
    state.user_name = name;
  },
};

const state = {
  jwt: null,
  user_name: null,
  user_id: null,
};

export default {
  state,
  getters,
  actions,
  mutations,
};

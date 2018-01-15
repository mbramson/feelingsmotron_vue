import * as types from '../mutation-types';

const getters = {
  errorMessage: state => state.errorMessage,
};

const actions = {
  setErrorMessage({ commit }, message) {
    commit(types.SET_ERROR_MESSAGE, message);
  },
};

const mutations = {
  [types.SET_ERROR_MESSAGE](state, message) {
    state.errorMessage = message;
  },
};

const state = {
  errorMessage: null,
};

export default {
  state,
  getters,
  actions,
  mutations,
};

import * as types from '../mutation-types';

const getters = {
  errorMessage: state => state.errorMessage,
  errors: state => state.errors || {},
};

const actions = {
  setErrorMessage({ commit }, message) {
    commit(types.SET_ERROR_MESSAGE, message);
  },
  setErrors({ commit }, errorPayload) {
    commit(types.SET_ERROR, errorPayload);
  },
  clearErrors({ commit }) {
    commit(types.CLEAR_ERRORS);
  },
};

const mutations = {
  [types.SET_ERROR](state, { message, error }) {
    state.errorMessage = message;
    state.errors = error.response.data.errors;
  },
  [types.SET_ERROR_MESSAGE](state, message) {
    state.errorMessage = message;
  },
  [types.CLEAR_ERRORS](state) {
    state.errorMessage = null;
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

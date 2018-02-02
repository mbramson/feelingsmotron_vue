import * as types from '../mutation-types';

const getters = {
  errorResponses: state => state.errorResponses,
};

const actions = {
  addError({ commit }, error) {
    commit(types.ADD_ERROR, error);
  },
  clearErrors({ commit }) {
    commit(types.CLEAR_ERRORS);
  },
};

const mutations = {
  [types.ADD_ERROR](state, error) {
    state.errorResponses.push(error);
  },
  [types.CLEAR_ERRORS](state) {
    state.errorResponses = [];
  },
};

const state = {
  errorResponses: [],
};

export default {
  state,
  getters,
  actions,
  mutations,
};

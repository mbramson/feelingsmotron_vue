import _ from 'lodash';
import * as types from '../mutation-types';

const errorsForField = function errorsForField(errorResponse, field) {
  const data = errorResponse.response.data;
  return (data.errors || {})[field];
};

const fieldSpecificErrors = function fieldSpecificErrors(errorResponses, field) {
  const result = errorResponses.map(e => errorsForField(e, field));
  return _.flatten(result);
};

const getters = {
  errorResponses: state => state.errorResponses,
  errorsForDescriptionField: state => fieldSpecificErrors(state.errorResponses, 'description'),
  errorsForNameField: state => fieldSpecificErrors(state.errorResponses, 'name'),
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

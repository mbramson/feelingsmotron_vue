import * as types from '../mutation-types';

const getters = {
  formFieldName: state => state.formFieldName,
  formFieldDescription: state => state.formFieldDescription,
};

const actions = {
  clearFormData({ commit }) {
    commit(types.CLEAR_FORM_DATA);
  },
};

const mutations = {
  [types.CLEAR_FORM_DATA](state) {
    state.formFieldName = '';
    state.formFieldDescription = '';
  },
  [types.SET_FORM_NAME_FIELD](state, name) {
    state.formFieldName = name;
  },
  [types.SET_FORM_DESCRIPTION_FIELD](state, description) {
    state.formFieldDescription = description;
  },
};

const state = {
  formFieldName: '',
  formFieldDescription: '',
};

export default {
  state,
  getters,
  actions,
  mutations,
};

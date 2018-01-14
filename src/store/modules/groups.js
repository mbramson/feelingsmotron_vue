import * as types from '../mutation-types';

const getters = {
  groups: state => state.groups,
};

const actions = {
  fetchGroups({ commit }, groups) {
    commit(types.FETCH_GROUPS, groups);
  },
};

const mutations = {
  [types.FETCH_GROUPS](state, groups) {
    state.groups = groups;
  },
};

const state = {
  groups: [],
};

export default {
  state,
  getters,
  actions,
  mutations,
};

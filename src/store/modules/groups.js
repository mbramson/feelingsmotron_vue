import * as types from '../mutation-types';
import groupApi from '../../api/groups';

const getters = {
  groups: state => state.groups,
};

const actions = {
  fetchGroups({ commit, rootGetters }) {
    groupApi.getIndex(rootGetters.requestHeaders)
      .then((response) => {
        commit(types.FETCH_GROUPS, response.data.groups);
      })
      .catch((error) => {
        console.log(error);
      });
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

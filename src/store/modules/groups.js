import _ from 'lodash';
import Vue from 'vue';
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
        const message = `Error retrieving groups: ${error}`;
        commit(types.SET_ERROR_MESSAGE, message);
      });
  },
  fetchGroup({ commit, rootGetters }, groupId) {
    groupApi.getGroup(rootGetters.requestHeaders, groupId)
      .then((response) => {
        // Maybe alter the response so that we have response.data.group here
        commit(types.UPDATE_GROUP, response.data);
      })
      .catch((error) => {
        const message = `Error retrieving group: ${error}`;
        commit(types.SET_ERROR_MESSAGE, message);
      });
  },
};

const mutations = {
  [types.FETCH_GROUPS](state, groups) {
    state.groups = groups;
  },
  [types.UPDATE_GROUP](state, group) {
    const index = state.groups.findIndex(g => g.id === group.id);
    if (index === -1) {
      state.groups.push(group);
    } else {
      Vue.set(state.groups, index, group);
    }
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

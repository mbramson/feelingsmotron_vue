import _ from 'lodash';
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
    // remove the old group if it existed before since its data may be stale
    const newGroups = _.remove(state.groups, g => g.id === group.id);
    // Add this group with new data
    newGroups.push(group);
    state.groups = newGroups;
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

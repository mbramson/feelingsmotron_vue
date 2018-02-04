import Vue from 'vue';
import * as types from '../mutation-types';
import groupApi from '../../api/groups';
import groupInvitationApi from '../../api/group_invitations';

const getters = {
  groups: state => state.groups,
  invitations: state => state.invitations,
};

const actions = {
  acceptGroupInvitation({ commit, rootGetters }, invitationId) {
    groupInvitationApi.acceptInvitation(rootGetters.requestHeaders, invitationId)
      .then((response) => {
        commit(types.DELETE_GROUP_INVITATION, response.data.group_invitation);
        const payload = {
          groupId: response.data.user_group.group_id,
          newUser: rootGetters.currentUser,
        };
        commit(types.ADD_USER_TO_GROUP, payload);
      })
      .catch((error) => {
        commit(types.ADD_ERROR, error);
      });
  },
  createGroup({ commit, rootGetters }, params) {
    return new Promise((resolve, reject) => {
      groupApi.createGroup(rootGetters.requestHeaders, params)
        .then((response) => {
          commit(types.ADD_GROUP, response.data.group);
          resolve(response);
        })
        .catch((error) => {
          commit(types.ADD_ERROR, error);
          reject(error);
        });
    });
  },
  deleteGroup({ commit, rootGetters }, groupId) {
    return new Promise((resolve, reject) => {
      groupApi.deleteGroup(rootGetters.requestHeaders, groupId)
        .then((response) => {
          commit(types.DELETE_GROUP, response.data.group);
          resolve(response);
        })
        .catch((error) => {
          commit(types.ADD_ERROR, error);
          reject(error);
        });
    });
  },
  deleteGroupInvitation({ commit, rootGetters }, invitationId) {
    groupInvitationApi.deleteInvitation(rootGetters.requestHeaders, invitationId)
      .then((response) => {
        commit(types.DELETE_GROUP_INVITATION, response.data.group_invitation);
      })
      .catch((error) => {
        commit(types.ADD_ERROR, error);
      });
  },
  fetchGroup({ commit, rootGetters }, groupId) {
    return new Promise((resolve, reject) => {
      groupApi.getGroup(rootGetters.requestHeaders, groupId)
        .then((response) => {
          commit(types.UPDATE_GROUP, response.data.group);
          resolve(response);
        })
        .catch((error) => {
          commit(types.ADD_ERROR, error);
          reject(error);
        });
    });
  },
  fetchGroups({ commit, rootGetters }) {
    groupApi.getIndex(rootGetters.requestHeaders)
      .then((response) => {
        commit(types.UPDATE_ALL_GROUPS, response.data.groups);
      })
      .catch((error) => {
        commit(types.ADD_ERROR, error);
      });
  },
  fetchGroupInvitations({ commit, rootGetters }) {
    return new Promise((resolve, reject) => {
      groupInvitationApi.getIndex(rootGetters.requestHeaders)
        .then((response) => {
          commit(types.UPDATE_ALL_GROUP_INVITATIONS, response.data.group_invitations);
          resolve(response);
        })
        .catch((error) => {
          commit(types.ADD_ERROR, error);
          reject(error);
        });
    });
  },
  requestGroupMembership({ commit, rootGetters }, { userId, groupId }) {
    groupInvitationApi.requestMembership(rootGetters.requestHeaders, userId, groupId)
      .then((response) => {
        commit(types.ADD_GROUP_INVITATION, response.data.group_invitation);
      })
      .catch((error) => {
        commit(types.ADD_ERROR, error);
      });
  },
  updateGroup({ commit, rootGetters }, { groupId, params }) {
    return new Promise((resolve, reject) => {
      groupApi.updateGroup(rootGetters.requestHeaders, groupId, params)
        .then((response) => {
          commit(types.UPDATE_GROUP, response.data.group);
          resolve(response);
        })
        .catch((error) => {
          commit(types.ADD_ERROR, error);
          reject(error);
        });
    });
  },
};

const mutations = {
  [types.ADD_GROUP](state, group) {
    state.groups.push(group);
  },
  [types.ADD_GROUP_INVITATION](state, invitation) {
    const index = state.invitations.findIndex(i => i.id === invitation.id);
    if (index === -1) {
      state.invitations = [];
      state.invitations.push(invitation);
    } else {
      Vue.set(state.invitations, index, invitation);
    }
  },
  [types.ADD_USER_TO_GROUP](state, { groupId, newUser }) {
    const groupIndex = state.groups.findIndex(i => i.id === groupId);
    if (groupIndex !== -1) {
      const group = state.groups[groupIndex];
      group.users.push(newUser);
    }
  },
  [types.DELETE_GROUP](state, group) {
    const index = state.groups.findIndex(g => g.id === group.id);
    if (index !== -1) {
      state.groups.splice(index, 1);
    }
  },
  [types.DELETE_GROUP_INVITATION](state, invitation) {
    const index = state.invitations.findIndex(i => i.id === invitation.id);
    if (index !== -1) {
      state.invitations.splice(index, 1);
    }
  },
  [types.UPDATE_ALL_GROUP_INVITATIONS](state, invitations) {
    state.invitations = invitations;
  },
  [types.UPDATE_ALL_GROUPS](state, groups) {
    state.groups = groups;
  },
  [types.UPDATE_GROUP](state, group) {
    const index = state.groups.findIndex(g => g.id === group.id);
    if (index === -1) {
      state.groups = [];
      state.groups.push(group);
    } else {
      Vue.set(state.groups, index, group);
    }
  },
};

const state = {
  groups: [],
  invitations: [],
};

export default {
  state,
  getters,
  actions,
  mutations,
};

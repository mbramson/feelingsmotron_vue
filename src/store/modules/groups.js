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
        const message = `Error accepting group invitation: ${error}`;
        commit(types.SET_ERROR_MESSAGE, message);
      });
  },
  deleteGroupInvitation({ commit, rootGetters }, invitationId) {
    groupInvitationApi.deleteInvitation(rootGetters.requestHeaders, invitationId)
      .then((response) => {
        commit(types.DELETE_GROUP_INVITATION, response.data.group_invitation);
      })
      .catch((error) => {
        const message = `Error declining group invitation: ${error}`;
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
  fetchGroups({ commit, rootGetters }) {
    groupApi.getIndex(rootGetters.requestHeaders)
      .then((response) => {
        commit(types.UPDATE_ALL_GROUPS, response.data.groups);
      })
      .catch((error) => {
        const message = `Error retrieving groups: ${error}`;
        commit(types.SET_ERROR_MESSAGE, message);
      });
  },
  fetchGroupInvitations({ commit, rootGetters }) {
    groupInvitationApi.getIndex(rootGetters.requestHeaders)
      .then((response) => {
        commit(types.UPDATE_ALL_GROUP_INVITATIONS, response.data.group_invitations);
      })
      .catch((error) => {
        const message = `Error retrieving group invitations: ${error}`;
        commit(types.SET_ERROR_MESSAGE, message);
      });
  },
  requestGroupMembership({ commit, rootGetters }, { userId, groupId }) {
    groupInvitationApi.requestMembership(rootGetters.requestHeaders, userId, groupId)
      .then((response) => {
        commit(types.ADD_GROUP_INVITATION, response.data.group_invitation);
      })
      .catch((error) => {
        const message = `Error requesting group membership: ${error}`;
        commit(types.SET_ERROR_MESSAGE, message);
      });
  },
  updateGroup({ commit, rootGetters }, { groupId, params }) {
    groupInvitationApi.updateGroup(rootGetters.requestHeaders, groupId, params)
      .then((response) => {
        commit(types.UPDATE_GROUP, response.data.group);
      })
      .then((error) => {
        const message = `Error updating group: ${error}`;
        commit(types.SET_ERROR_MESSAGE, message);
      });
  },
};

const mutations = {
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

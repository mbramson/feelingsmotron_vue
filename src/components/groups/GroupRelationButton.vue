<template>
  <div class="group-relation-button">
    <div class="btn-group" role="group">
      <button v-if="currentUserIsOwner" class="btn-sm btn-success">Owner</button>
      <button v-else-if="currentUserIsMember" class="btn-sm btn-success">Member</button>
      <button v-else class="btn-sm btn-success">Request Membership</button>
      <button class="btn-sm btn-success" v-if="currentUserInvitedByGroup">Accept Group Invitation</button>
      <button class="btn-sm btn-secondary disabled" disabled v-if="currentUserRequestedMembership">Membership Request Pending...</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GroupRelationButton',
  props: [
    'group',
  ],
  computed: {
    headers: function () {
      return this.$store.getters.requestHeaders;
    },
    userId: function () {
      return this.$store.getters.user_id;
    },
    owner: function () {
      return this.group.owner || {};
    },
    currentUserIsOwner: function () {
      return this.$store.getters.user_id === this.owner.id;
    },
    users: function () {
      return this.group.users || [];
    },
    currentUserIsMember: function () {
      const index = this.users.findIndex(u => u.id === this.userId);
      return index !== -1;
    },
    currentUserInvitedByGroup: function () {
      return this.groupInvite.from_group === true;
    },
    currentUserRequestedMembership: function () {
      return this.groupInvite.from_group === false;
    },
    groupInvite: function () {
      return this.$store.getters.invitations.find(i => i.group_id === this.group.id) || {};
    },
  },
};
</script>
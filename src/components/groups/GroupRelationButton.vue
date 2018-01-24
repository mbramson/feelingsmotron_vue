<template>
  <div class="group-relation-button">
    <div class="btn-group" role="group">
      <button v-if="currentUserIsOwner" class="btn-xs btn-primary">Owner</button>
      <button v-if="currentUserIsMember" class="btn-xs btn-primary">Member</button>
      <button v-if="currentUserCanRequestMembership" @click="requestMembership" class="btn-xs btn-success">Request Membership</button>
      <template v-if="currentUserInvitedByGroup">
        <button class="btn-xs btn-success">Accept Invitation</button>
        <button class="btn-xs btn-danger">Decline Invitation</button>
      </template>
      <button class="btn-xs btn-secondary disabled" disabled v-if="currentUserRequestedMembership">Request Pending...</button>
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
    currentUserCanRequestMembership: function () {
      return !this.currentUserIsMember
          && !this.currentUserInvitedByGroup
          && !this.currentUserRequestedMembership
    },
    currentUserIsOwner: function () {
      return this.userId === this.owner.id;
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
  methods: {
    requestMembership: _.throttle(
      function requestMembership() {
        this.$store.dispatch('requestGroupMembership', {
          userId: this.userId,
          groupId: this.group.id,
        });
      },
      1000, // milliseconds to throttle
      { leading: true, trailing: true },
    ),
  },
};
</script>
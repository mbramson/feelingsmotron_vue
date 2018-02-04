<template>
  <div class="group-overview">
    <app-nav></app-nav>
    <div v-if="groupInStore" class="container col-xs-6 col-xs-offset-3">
      <h1>{{ name }}</h1>
      <dd>{{ description }}</dd>
      <template v-if="groupLoaded">
        <router-link v-if="userCanAccessSettings" :to="{ name: 'GroupSettings', params: { id: groupId }}">Settings</router-link>
        <br>
        <template v-if="groupInvitationsLoaded">
          <group-relation-button v-bind:group="currentGroup"/>
        </template>
        <template v-else>
          <p>Loading your relation to group...</p>
        </template>
        <dt>Owner</dt>
        <dd>{{ owner.name }}</dd>
      </template>
      <template v-else>
        <p>Loading Group Information...</p>
      </template>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">Members</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="groupLoaded">
            <tr v-for="user in users">
              <th scope="row">{{ user.name }}</th>
            </tr>
          </template>
          <template v-else>
            <tr>
              <th scope="row">Loading Members...</th>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import AppNav from '../AppNav';
import GroupRelationButton from './GroupRelationButton';

export default {
  name: 'GroupOverview',
  components: {
    AppNav,
    GroupRelationButton,
  },
  data() {
    return {
      groupStatus: 'notRequested',
      groupInvitationStatus: 'notRequested',
    };
  },
  computed: {
    groupId: function () {
      return this.$route.params.id;
    },
    groupInStore: function () {
      return this.currentGroup !== {};
    },
    currentGroup: function () {
      // eslint-disable-next-line eqeqeq
      return _.find(this.$store.getters.groups, g => g.id == this.groupId) || {};
    },
    description: function () {
      return this.currentGroup.description;
    },
    groupLoaded: function () {
      return this.groupStatus === 'loaded';
    },
    groupInvitationsLoaded: function () {
      return this.groupInvitationStatus === 'loaded';
    },
    name: function () {
      return this.currentGroup.name;
    },
    owner: function () {
      return this.currentGroup.owner || {};
    },
    ownerLoaded: function () {
      return this.owner !== {};
    },
    userCanAccessSettings: function () {
      return this.owner && this.owner.id === this.$store.getters.user_id;
    },
    users: function () {
      return this.currentGroup.users || [];
    },
  },
  mounted: function afterMount() {
    this.groupStatus = 'requested';
    this.$store.dispatch('fetchGroup', this.groupId)
      .then(() => {
        this.groupStatus = 'loaded';
      }).catch(() => {
        this.groupStatus = 'error';
      });
    this.groupInvitationStatus = 'requested';
    this.$store.dispatch('fetchGroupInvitations')
      .then(() => {
        this.groupInvitationStatus = 'loaded';
      }).catch(() => {
        this.groupInvitationStatus = 'error';
      });
  },
};
</script>
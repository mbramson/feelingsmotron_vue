<template>
  <div class="group-overview">
    <app-nav></app-nav>
    <div v-if="groupInStore" class="container col-xs-6 col-xs-offset-3">
      <h1>{{ name }}</h1>
      <dd>{{ description }}</dd>
      <router-link v-if="userCanAccessSettings" :to="{ name: 'GroupSettings', params: { id: groupId }}">Settings</router-link>
      <br>
      <div v-if="ownerLoaded">
        <dt>Owner</dt>
        <dd>{{ owner.name }}</dd>
      </div>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">Members</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users">
            <th scope="row">{{ user.name }}</th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import AppNav from '../AppNav';

export default {
  name: 'GroupOverview',
  components: {
    AppNav,
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
    this.$store.dispatch('fetchGroup', this.groupId);
    this.$store.dispatch('fetchGroupInvitations');
  },
};
</script>
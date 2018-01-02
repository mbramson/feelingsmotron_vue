<template>
  <div class="group-overview">
    <app-nav></app-nav>
    <dd v-if="isError">{{ error_message }}</dd>
    <div v-if="isLoaded" class="container col-xs-4 col-xs-offset-4">
      <h1>{{ name }}</h1>
      <dt>Owner</dt>
      <dd>{{ owner.name }}</dd>
      <div class="row" v-for="user in users">
        {{ user.name }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import AppNav from '../AppNav';

const groupUrl = 'http://localhost:4000/api/v1/groups'

export default {
  name: 'GroupOverview',
  components: {
    AppNav,
  },
  data() {
    return {
      name: '',
      owner: null,
      users: [],
      status: 'notRequested',
      error_message: '',
    };
  },
  computed: {
    headers: function() {
      return this.$store.getters.requestHeaders
    },
    groupUrl: function() {
      return `http://localhost:4000/api/v1/groups/${this.groupId}`
    },
    groupId: function() {
      return this.$route.params.id
    },
    isError: function() {
      return this.status === 'error'
    },
    isLoaded: function() {
      return this.status ==='success'
    },
  },
  mounted: function afterMount() {
    const vm = this;
    this.status = 'requesting';
    axios.get(this.groupUrl, this.headers)
      .then((response) => {
        vm.name = response.data.name;
        vm.owner = response.data.owner;
        vm.users = response.data.users;
        vm.status = 'success';
      })
      .catch((error) => {
        vm.status = 'error';
        vm.error_message = `Error! Could not retrieve Group: ${error}`;
      });
  },
};
</script>
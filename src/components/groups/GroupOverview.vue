<template>
  <div class="group-overview">
    <app-nav></app-nav>
    <dd v-if="isError">{{ error_message }}</dd>
    <div v-if="isLoaded" class="container col-xs-6 col-xs-offset-3">
      <h1>{{ name }}</h1>
      <dd>{{ description }}</dd>
      <router-link v-if="userCanAccessSettings" :to="{ name: 'GroupSettings', params: { id: groupId }}">Settings</router-link>
      <br>
      <dt>Owner</dt>
      <dd>{{ owner.name }}</dd>
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
import axios from 'axios';
import AppNav from '../AppNav';

export default {
  name: 'GroupOverview',
  components: {
    AppNav,
  },
  data() {
    return {
      name: '',
      description: '',
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
    userCanAccessSettings() {
      return this.owner && this.owner.id === this.$store.getters.user_id
    }
  },
  mounted: function afterMount() {
    const vm = this;
    this.status = 'requesting';
    axios.get(this.groupUrl, this.headers)
      .then((response) => {
        vm.name = response.data.name;
        vm.description = response.data.description;
        vm.owner = response.data.owner;
        vm.users = response.data.users;
        vm.status = 'success';
      })
      .catch((error) => {
        vm.status = 'error';
        if (error.response.status === 404) {
          vm.error_message = 'Group could not be found'
        } else {
          vm.error_message = `Error retrieving Group: ${error}`;
        }
      });
  },
};
</script>
<template>
  <div class="profile">
    <app-nav></app-nav>
    <div class="row centered-form center-block">
      <div class="container col-xs-4 col-xs-offset-4">
        <template v-if="isRequesting">
          <h1>Loading...</h1>
        </template>
        <template v-if="isError">
          <h1>Error retrieving profile...</h1>
        </template>
        <template v-if="isLoaded">
          <h1>Profile</h1>
          <dt>Name</dt>
          <dd>{{ name }}</dd>
          <dt>Email</dt>
          <dd>{{ email }}</dd>
          <br>
          <router-link to="/profile/update">Update Profile</router-link>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import AppNav from './AppNav';

const profileUrl = 'http://localhost:4000/api/v1/profile'

export default {
  name: 'Profile',
  components: {
    AppNav,
  },
  data() {
    return {
      email: null,
      name: null,
      status: 'notLoaded',
    }
  },
  computed: {
    headers: function() {
      return this.$store.getters.requestHeaders
    },
    isLoaded: function() {
      return this.status === 'success'
    },
    isRequesting: function() {
      return this.status === 'requesting'
    },
    isError: function() {
      return this.status === 'error'
    },
  },
  mounted: function afterMount() {
    this.status = 'requesting';
    axios.get(profileUrl, this.headers)
      .then((response) => {
        this.name = response.data.name;
        this.email = response.data.email;
        this.status = 'success';
      })
      .catch((error) => {
        this.status = 'error';
      });
  },
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
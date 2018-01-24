<template>
  <div class="profileUpdate">
    <app-nav></app-nav>
    <h4 v-if="isError">{{ error_message }}</h4>
    <div class="row centered-form center-block">
      <div class="container col-xs-4 col-xs-offset-4">
        <template v-if="isRequestingProfile">
          <h1>Loading...</h1>
        </template>
        <template v-if="isLoaded">
          <form>
            <div class="form-group">
              <label for="emailInput">Email</label>
              <input type="email" autocomplete="off" class="form-control" id="emailInput" v-model="email" placeholder="email">
              <div class="text-danger top-buffer">{{ emailError }}</div>
            </div>
            <div class="form-group">
              <label for="nameInput">Name</label>
              <input class="form-control" autocomplete="off" id="nameInput" v-model="name" placeholder="name">
              <div class="text-danger top-buffer">{{ nameError }}</div>
            </div>
            <div class="form-group">
              <label for="passwordInput">Password</label>
              <input type="password" autocomplete="new-password" class="form-control" id="form-group" v-model="password" placeholder="password (leave blank to not change)">
              <div class="text-danger top-buffer">{{ passwordError }}</div>
            </div>
            <button type="submit" class="btn btn-primary" v-on:click.prevent="submitUpdate">Update Profile</button>
          </form>
          <h4 v-if="updateSuccess">Profile Updated Successfully!</h4>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import AppNav from '../AppNav';

const profileUrl = 'http://localhost:4000/api/v1/profile';

export default {
  name: 'ProfileUpdate',
  components: {
    AppNav,
  },
  data() {
    return {
      email: null,
      name: null,
      password: null,
      fetchStatus: 'notLoaded',
      updateStatus: 'notSubmitted',
      error_message: '',
      response_errors: null,
    };
  },
  computed: {
    headers: function () {
      return this.$store.getters.requestHeaders;
    },
    updateBody: function () {
      return {
        user: {
          email: this.email,
          name: this.name,
          password: this.password,
        },
      };
    },
    isLoaded: function () {
      return this.fetchStatus === 'success';
    },
    updateSuccess: function () {
      return this.updateStatus === 'success';
    },
    isRequestingProfile: function () {
      return this.fetchStatus === 'requesting';
    },
    isRequestingUpdate: function () {
      return this.updateStatus === 'requesting';
    },
    isError: function () {
      return this.fetchStatus === 'error' || this.updateStatus === 'error';
    },
    nameError: function () {
      return ((this.response_errors || {}).name || [])[0];
    },
    emailError: function () {
      return ((this.response_errors || {}).email || [])[0];
    },
    passwordError: function () {
      return ((this.response_errors || {}).password || [])[0];
    },
  },
  methods: {
    submitUpdate: function submitUpdate() {
      this.updateStatus = 'requesting';
      axios.put(
        profileUrl,
        this.updateBody,
        this.headers,
        )
        .then((response) => {
          this.updateStatus = 'success';
          this.$store.dispatch('updateCurrentUserName', response.data.name);
        })
        .catch((error) => {
          this.updateStatus = 'error';
          if ([409, 422].includes(error.response.status)) {
            this.response_errors = error.response.data.errors;
          } else {
            this.error_message = `Error updating profile: ${error}`;
          }
        });
    },
  },
  mounted: function afterMount() {
    this.fetchStatus = 'requesting';
    axios.get(profileUrl, this.headers)
      .then((response) => {
        this.name = response.data.name;
        this.email = response.data.email;
        this.fetchStatus = 'success';
      })
      .catch((error) => {
        this.fetchStatus = 'error';
        this.error_message = `Error fetching profile: ${error}`;
      });
  },
};
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
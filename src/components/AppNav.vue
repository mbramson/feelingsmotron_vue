<template>
  <div class="app-nav">
    <nav class="navbar navbar-default navbar-expand-lg">
      <div class="navbar-header">
        <router-link to="/" class="navbar-brand"> Feelingsmotron </router-link>
        <button class="navbar-toggle" data-toggle="collapse" data-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
          <i class="glyphicon glyphicon-th-list"></i>
        </button>
      </div>
      <div class="collapse navbar-collapse" id="navbarContent">
        <ul class="nav navbar-nav navbar-right">
          <li class="nav-item">
            <router-link to="/groups" class="navbar-link">Groups</router-link>
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <router-link to="/profile" class="navbar-link">{{ user_name }}</router-link>
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <a href="#" class="navbar-link" @click="handleLogout()">Log out</a>
          </li>
          <li class="nav-item" v-if="!isLoggedIn">
            <router-link to="/login" class="navbar-link">Log In</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <div v-for="error in errorResponseMessages" class="alert alert-danger">
      <strong>{{ error }}</strong>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'app-nav',
  computed: {
    ...mapGetters({
      errorResponses: 'errorResponses',
      isLoggedIn: 'isLoggedIn',
      user_name: 'user_name',
    }),
    errorResponseMessages: function () {
      return this.errorResponses.map(e => `${e}`);
    },
  },
  methods: {
    handleProfile() {
      this.$router.push('/profile');
    },
    handleLogin() {
      this.$router.push('/login');
    },
    handleLogout() {
      this.$store.dispatch('logout');
      this.$router.push('/login');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar-right { margin-right: 0px !important}

.log {
  margin: 5px 10px 0 0;
}
</style>
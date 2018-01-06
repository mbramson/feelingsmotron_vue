<template>
  <nav class="navbar navbar-default">
    <div class="navbar-header">
      <router-link to="/" class="navbar-brand"> Feelingsmotron </router-link>
    </div>
    <ul class="nav navbar-nav navbar-left">
      <li>
        <router-link to="/groups" class="navbar-nav">Groups</router-link>
      </li>
    </ul>
    <ul class="nav navbar-nav navbar-right">
      <li v-if="isLoggedIn">
        <router-link to="/profile" class="navbar-nav">{{ user_name }}</router-link>
      </li>
      <li v-if="isLoggedIn">
        <a href="#" class="navbar-nav" @click="handleLogout()">Log out</a>
      </li>
      <li v-if="!isLoggedIn">
        <router-link to="/login" class="navbar-nav">Log In</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'app-nav',
  computed: {
    ...mapGetters({
      isLoggedIn: 'isLoggedIn',
      user_name: 'user_name',
    }),
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
<template>
  <nav class="navbar navbar-default">
    <div class="navbar-header">
      <router-link to="/" class="navbar-brand"> Feelingsmotron </router-link>
    </div>
    <ul class="nav navbar-nav navbar-right">
      <li>
        <button v-if="isLoggedIn" class="btn btn-primary log" @click="handleProfile()">{{ user_name }}</button>
        <button v-if="isLoggedIn" class="btn btn-danger log" @click="handleLogout()">Log out </button>
        <button v-if="!isLoggedIn" class="btn btn-info log" @click="handleLogin()">Log In</button>
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
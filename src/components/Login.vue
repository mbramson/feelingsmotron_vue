<template>
  <div class="login">
    <app-nav></app-nav>
    <h1>Feelingsmotron</h1>
    <input v-model="email" placeholder="email">
    <input type="password" v-model="password" placeholder="password">
    <button v-on:click="submitLogin">Submit</button>
    <h4>{{ status}}</h4>
  </div>
</template>

<script>
import axios from 'axios';
import AppNav from './AppNav';
import { setJwtToken } from '../utils/auth';

export default {
  name: 'Login',
  components: {
    AppNav,
  },
  data() {
    return {
      email: '',
      password: '',
      status: '',
    };
  },
  methods: {
    submitLogin: function submitLogin() {
      this.status = 'Logging in...';
      axios.post(
        'http://localhost:4000/api/v1/sessions',
        { user: {
          email: this.email,
          password: this.password,
        } },
        )
        .then((response) => {
          setJwtToken(response.data.jwt);
          this.status = `Logged in as ${response.data.user.name}`;
          this.$router.push('/');
        })
        .catch((error) => {
          if (error.response.status === 401) {
            this.status = 'Invalid Login Credentials';
          } else {
            this.status = `Login failed with error: ${error}`;
          }
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

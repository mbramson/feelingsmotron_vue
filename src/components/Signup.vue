<template>
  <div class="signup">
    <app-nav></app-nav>
    <h1>Feelingsmotron</h1>
    <input v-model="email" placeholder="email">
    <br>
    <input v-model="name" placeholder="name">
    <br>
    <input type="password" v-model="password" placeholder="password">
    <br>
    <button v-on:click="submitSignup">Submit</button>
    <h4>{{ status}}</h4>
  </div>
</template>

<script>
import axios from 'axios';
import AppNav from './AppNav';
import { setJwtToken } from '../utils/auth';

export default {
  name: 'Signup',
  components: {
    AppNav,
  },
  data() {
    return {
      email: '',
      name: '',
      password: '',
      status: '',
    };
  },
  methods: {
    submitSignup: function submitSignup() {
      this.status = 'Submitting...';
      axios.post(
        'http://localhost:4000/api/v1/registrations',
        { user: {
          email: this.email,
          name: this.name,
          password: this.password,
        } },
        )
        .then((response) => {
          setJwtToken(response.data.jwt);
          this.status = 'Signup Successful!';
          this.$router.push('/');
        })
        .catch((error) => {
          this.status = `Signup failed with error: ${error}`;
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

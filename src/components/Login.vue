<template>
  <div class="login">
    <app-nav></app-nav>
    <div class="row centered-form center-block">
      <div class="container col-xs-4 col-xs-offset-4">
        <h4 class ="text-danger" v-if="isError">{{ error_message }}</h4>
        <h1>Login</h1>
        <form>
          <div class="form-group">
            <label for="emailInput">Email</label>
            <input autocomplete="email" class="form-control" id="emailInput" v-model="email" placeholder="email">
          </div>
          <div class="form-group">
            <label for="passwordInput">Password</label>
            <input type="password" autocomplete="current-password" class="form-control" id="form-group" v-model="password" placeholder="password">
          </div>
          <button type="submit" class="btn btn-primary" v-on:click.prevent="submitLogin">Submit</button>
          <br>
          <router-link to="/signup"> Not a member? Sign up! </router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import AppNav from './AppNav';

const loginUrl = 'http://localhost:4000/api/v1/sessions'

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
      error_message: '',
    };
  },
  computed: {
    request_body: function() {
      return { user: {
        email: this.email,
        password: this.password,
      } }
    },
    isError: function() {
      return this.status === 'error'
    }
  },
  methods: {
    submitLogin: function submitLogin() {
      this.status = 'notSubmitted';
      axios.post(
        loginUrl,
        this.request_body,
        )
        .then((response) => {
          const userData = {
            jwt: response.data.jwt,
            name: response.data.user.name,
            id: response.data.user.id,
          };
          this.$store.dispatch('login', userData);
          this.status = 'success';
          this.$router.push('/');
        })
        .catch((error) => {
          this.status = 'error';
          if (error.response.status === 401) {
            this.error_message = 'Invalid Login Credentials';
          } else {
            this.error_message = `Login failed with error: ${error}`;
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

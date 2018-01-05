<template>
  <div class="signup">
    <app-nav></app-nav>
    <h4 v-if="isError">{{ error_message }}</h4>
    <div class="row centered-form center-block">
      <div class="container col-xs-4 col-xs-offset-4">
        <h1>Sign up</h1>
        <form>
          <div class="form-group">
            <label for="emailInput">Email</label>
            <input type="email" class="form-control" id="emailInput" v-model="email" placeholder="email">
            <div class="text-danger top-buffer">{{ emailError }}</div>
          </div>
          <div class="form-group">
            <label for="nameInput">Name</label>
            <input class="form-control" id="nameInput" v-model="name" placeholder="name">
            <div class="text-danger top-buffer">{{ nameError }}</div>
          </div>
          <div class="form-group">
            <label for="passwordInput">Password</label>
            <input type="password" autocomplete="new-password" class="form-control" id="passwordInput" v-model="password" placeholder="password">
            <div class="text-danger top-buffer">{{ passwordError }}</div>
          </div>
          <br>
          <button class="btn btn-primary" v-on:click.prevent="submitSignup">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import AppNav from './AppNav';

const registrationUrl = 'http://localhost:4000/api/v1/registrations'

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
      error_message: '',
      response_errors: null,
    };
  },
  computed: {
    nameError: function() {
      return ((this.response_errors || {}).name || [])[0]
    },
    emailError: function() {
      return ((this.response_errors || {}).email || [])[0]
    },
    passwordError: function() {
      return ((this.response_errors || {}).password || [])[0]
    },
    isError: function() {
      return this.status === 'error'
    },
    requestBody: function() {
      return { user: {
        email: this.email,
        name: this.name,
        password: this.password,
      } }
    },
  },
  methods: {
    submitSignup: function submitSignup() {
      this.status = 'submitting';
      axios.post(
        registrationUrl,
        this.requestBody,
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
          this.status = 'error'
          if ([409, 422].includes(error.response.status)) {
            this.response_errors = error.response.data.errors
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
.top-buffer {
  margin-top:10px;
}
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

<template>
  <div class="signup">
    <app-nav></app-nav>
    <div class="row centered-form center-block">
      <div class="container col-xs-4 col-xs-offset-4">
        <h1>Sign up</h1>
        <form>
          <div class="form-group">
            <label for="emailInput">Email</label>
            <input type="email" class="form-control" id="emailInput" v-model="email" placeholder="email">
          </div>
          <div class="form-group">
            <label for="nameInput">Name</label>
            <input class="form-control" id="nameInput" v-model="name" placeholder="name">
          </div>
          <div class="form-group">
            <label for="passwordInput">Password</label>
            <input type="password" class="form-control" id="passwordInput" v-model="password" placeholder="password">
          </div>
          <br>
          <button class="btn btn-primary" v-on:click="submitSignup">Submit</button>
          <h4>{{ status}}</h4>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import AppNav from './AppNav';

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
          const userData = {
            jwt: response.data.jwt,
            name: response.data.user.name,
            id: response.data.user.id,
          };
          this.$store.dispatch('login', userData);
          this.status = 'Signup Successful!';
          this.$router.push('/');
        })
        .catch((error) => {
          if (error.response.status === 409) {
            this.status = 'User with that email already exists';
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

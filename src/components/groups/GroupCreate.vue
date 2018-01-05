<template>
  <div class="group-create">
    <app-nav></app-nav>
    <h4 v-if="isError">{{ error_message }}</h4>
    <div class="container col-xs-6 col-xs-offset-3">
      <h1>Create a new group</h1>
      <p>A group should encompass all of the people that you might want to aggregate data for. If you're a company, this would probably be the company name. You can always subdivide into teams and titles with labels within the group.</p>
      <p>If you're already in a group and want to collect data for your team, you probably want to create a new label for the group you're already in instead.</p>
      <form>
        <div class="form-group">
          <label for="nameInput">Group Name</label>
          <input class="form-control" id="nameInput" v-model="name" placeholder="Group Name">
          <div class="text-danger top-buffer">{{ nameError }}</div>
        </div>
        <div class="form-group">
          <label for="descriptionInput">Group Description</label>
          <textarea class="form-control" aria-label="description" id="descriptionInput" v-model="description" rows="2" placeholder="Group Description (optional)"></textarea>
          <div class="text-danger top-buffer">{{ descriptionError }}</div>
        </div>
        <button class="btn btn-primary" v-on:click.prevent="submitGroupCreate">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import AppNav from '../AppNav';

const groupUrl = 'http://localhost:4000/api/v1/groups';

export default {
  name: 'GroupCreate',
  components: {
    AppNav,
  },
  data() {
    return {
      name: '',
      description: '',
      status: 'notSubmitted',
      error_message: '',
      response_errors: null,
    };
  },
  computed: {
    headers: function() {
      return this.$store.getters.requestHeaders
    },
    request_body: function() {
      return { group: {
        name: this.name,
        description: this.description,
      } }
    },
    isError: function() {
      return this.status === 'error'
    },
    nameError: function() {
      return ((this.response_errors || {}).name || [])[0]
    },
    descriptionError: function() {
      return ((this.response_errors || {}).description || [])[0]
    },
  },
  methods: {
    submitGroupCreate: function submitGroupCreate() {
      axios.post(
        groupUrl,
        this.request_body,
        this.headers,
        )
        .then((response) => {
          this.status = 'success';
          this.$router.push('/groups/' + response.data.id);
        })
        .catch((error) => {
          this.status = 'error';
          if ([409, 422].includes(error.response.status)) {
            this.response_errors = error.response.data.errors
          } else {
            this.error_message = `Error creating group: ${error}`;
          }
        });
    },
  },
};
</script>

<style scoped>
.top-buffer {
  margin-top:10px;
}
</style>
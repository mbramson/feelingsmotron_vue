<template>
  <div class="group-create">
    <app-nav></app-nav>
    <h4 class ="text-danger" v-if="isError">{{ error_message }}</h4>
    <div v-if="isLoaded" class="container col-xs-6 col-xs-offset-3">
      <h1>Edit Group: {{ fetchedName }}</h1>
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
        <button class="btn btn-primary" v-on:click.prevent="submitGroupUpdate">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import AppNav from '../AppNav';

export default {
  name: 'GroupSettings',
  components: {
    AppNav,
  },
  data() {
    return {
      name: '',
      description: '',
      fetchedName: '',
      fetchStatus: 'notRequested',
      updateStatus: '',
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
    groupUrl: function () {
      return 'http://localhost:4000/api/v1/groups/' + this.groupId
    },
    groupId: function() {
      return this.$route.params.id
    },
    isError: function() {
      return this.fetchStatus === 'error' || this.updateStatus === 'error'
    },
    isLoaded: function() {
      return this.fetchStatus === 'success'
    },
    nameError: function() {
      return ((this.response_errors || {}).name || [])[0]
    },
    descriptionError: function() {
      return ((this.response_errors || {}).description || [])[0]
    },
  },
  methods: {
    submitGroupUpdate: function submitGroupUpdate() {
      axios.put(
        this.groupUrl,
        this.request_body,
        this.headers,
        )
        .then((response) => {
          this.updateStatus = 'success';
          this.$router.push('/groups/' + response.data.id);
        })
        .catch((error) => {
          this.updateStatus = 'error';
          if ([409, 422].includes(error.response.status)) {
            this.response_errors = error.response.data.errors
          } else if(error.response.status === 403) {
            this.error_message = "You're not allowed to change this group's settings"
          } else {
            this.error_message = `Error creating group: ${error}`;
          }
        });
    },
  },
  mounted: function afterMount() {
    console.log('making initial request')
    this.fetchStatus = 'requesting';
    axios.get(this.groupUrl, this.headers)
      .then((response) => {
        this.fetchedName = response.data.name;
        this.name = response.data.name;
        this.description = response.data.description;
        this.fetchStatus = 'success';
      })
      .catch((error) => {
        this.fetchStatus = 'error';
        this.error_message = `Error fetching group: ${error}`;
      });
  },
};
</script>

<style scoped>
.top-buffer {
  margin-top:10px;
}
</style>
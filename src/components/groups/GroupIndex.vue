<template>
  <div class="group-index">
    <app-nav></app-nav>
    <div class="container-fluid">
      <h1>All Groups</h1>
      <h4 v-if="noGroupsFound">No groups were found...</h4>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">Group</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="group in groups">
            <th scope="row">{{ group.name }}</th>
            <th scope="row">{{ group.description }}</th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import AppNav from '../AppNav';

const groupUrl = 'http://localhost:4000/api/v1/groups'

export default {
  name: 'GroupIndex',
  components: {
    AppNav,
  },
  data() {
    return {
      groups: [],
      status: '',
    };
  },
  computed: {
    headers: function() {
      return this.$store.getters.requestHeaders
    },
    noGroupsFound: function() {
      return this.status === 'success' && this.groups.length == 0
    },
  },
  mounted: function afterMount() {
    const vm = this;
    this.status = 'Retrieving Groups...';
    axios.get(groupUrl, this.headers)
      .then((response) => {
        vm.groups = response.data.groups;
        vm.status = 'success';
      })
      .catch((error) => {
        vm.status = `Error! Could not retrieve Groups from API: ${error}`;
      });
  },
};
</script>
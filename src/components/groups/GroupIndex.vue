<template>
  <div class="group-index">
    <app-nav></app-nav>
    <div class="container col-xs-4 col-xs-offset-4">
      <h1>All Groups</h1>
      <h4 v-if="noGroupsFound">No groups were found...</h4>
      <div class="row" v-for="group in groups">
        {{ group.name }}
      </div>
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
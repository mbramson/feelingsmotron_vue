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
            <th scope="row">
              <router-link :to="{ name: 'GroupOverview', params: { id: group.id }}">{{ group.name }}</router-link>
            </th>
            <th scope="row">{{ group.description }}</th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import AppNav from '../AppNav';

export default {
  name: 'GroupIndex',
  components: {
    AppNav,
  },
  data() {
    return {
      status: '',
    };
  },
  computed: {
    headers: function () {
      return this.$store.getters.requestHeaders;
    },
    groups: function () {
      return this.$store.getters.groups;
    },
    noGroupsFound: function () {
      return this.status === 'success' && this.groups.length === 0;
    },
  },
  mounted: function afterMount() {
    this.status = 'Retrieving Groups...';
    this.$store.dispatch('fetchGroups');
  },
};
</script>
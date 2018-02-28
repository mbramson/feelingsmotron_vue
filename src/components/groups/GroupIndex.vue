<template>
  <div class="group-index">
    <app-nav></app-nav>
    <div class="container-fluid">
      <h1>Groups</h1>
      <h4 v-if="noGroupsFound">No groups were found...</h4>
      <table class="table table-hover">
        <thead class="thead-light">
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
      <router-link class="btn-sm btn-primary" :to="{ name: 'GroupCreate' }">New Group</router-link>
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
  computed: {
    groups: function () {
      return this.$store.getters.groups;
    },
    noGroupsFound: function () {
      return this.groups.length === 0;
    },
  },
  mounted: function afterMount() {
    this.$store.dispatch('fetchGroups');
    this.$store.dispatch('fetchGroupInvitations');
  },
};
</script>

<style scoped>
h1 {
  font-weight: normal;
  margin: 30px 0px 20px 0;
}
</style>
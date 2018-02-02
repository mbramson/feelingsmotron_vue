<template>
  <div class="group-create">
    <app-nav></app-nav>
    <div class="container col-xs-6 col-xs-offset-3">
      <h1>Edit Group: {{ fetchedName }}</h1>
      <form>
        <div class="form-group">
          <label for="nameInput">Group Name</label>
          <input class="form-control" id="nameInput" v-model="name" placeholder="Group Name">
        </div>
        <div class="form-group">
          <label for="descriptionInput">Group Description</label>
          <textarea class="form-control" aria-label="description" id="descriptionInput" v-model="description" rows="2" placeholder="Group Description (optional)"></textarea>
        </div>
        <button class="btn btn-primary" v-on:click.prevent="submitGroupUpdate">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
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
    };
  },
  computed: {
    currentGroup: function () {
      // eslint-disable-next-line eqeqeq
      return _.find(this.$store.getters.groups, g => g.id == this.groupId) || {};
    },
    groupId: function () {
      return this.$route.params.id;
    },
    fetchedName: function () {
      return this.currentGroup.name;
    },
    request_body: function () {
      return { group: {
        name: this.name,
        description: this.description,
      } };
    },
  },
  methods: {
    submitGroupUpdate: function submitGroupUpdate() {
      console.log('submitGroupUpdate');
      const updateParameters = { groupId: this.groupId, params: this.request_body };
      this.$store.dispatch('updateGroup', updateParameters);
    },
  },
  mounted: function afterMount() {
    this.$store.dispatch('fetchGroup', this.groupId);
  },
};
</script>

<style scoped>
.top-buffer {
  margin-top:10px;
}
</style>
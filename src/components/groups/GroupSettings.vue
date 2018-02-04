<template>
  <div class="group-create">
    <app-nav></app-nav>
    <div class="container col-xs-6 col-xs-offset-3">
      <h1>Edit Group: {{ fetchedName }}</h1>
      <form>
        <div class="form-group">
          <label for="nameInput">Group Name</label>
          <input class="form-control" id="nameInput" @input="updateName" :placeholder="groupName">
        </div>
        <div class="form-group">
          <label for="descriptionInput">Group Description</label>
          <textarea class="form-control" @input="updateDescription" aria-label="description" id="descriptionInput" rows="2" :placeholder="groupDescription"></textarea>
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
  computed: {
    currentGroup: function () {
      // eslint-disable-next-line eqeqeq
      return _.find(this.$store.getters.groups, g => g.id == this.groupId) || {};
    },
    groupId: function () {
      return this.$route.params.id;
    },
    groupName: function () {
      return this.currentGroup.name;
    },
    groupDescription: function () {
      return this.currentGroup.description;
    },
    fetchedName: function () {
      return this.currentGroup.name;
    },
    request_body: function () {
      return { group: {
        name: this.$store.getters.formFieldName,
        description: this.$store.getters.formFieldDescription,
      } };
    },
  },
  methods: {
    submitGroupUpdate: function submitGroupUpdate() {
      const updateParameters = { groupId: this.groupId, params: this.request_body };
      this.$store.dispatch('updateGroup', updateParameters);
    },
    updateDescription (e) {
      this.$store.commit('SET_FORM_DESCRIPTION_FIELD', e.target.value);
    },
    updateName (e) {
      this.$store.commit('SET_FORM_NAME_FIELD', e.target.value);
    }
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
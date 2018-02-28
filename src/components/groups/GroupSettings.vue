<template>
  <div class="group-create">
    <app-nav></app-nav>
    <div class="container col-xs-6 col-xs-offset-3">
      <h1>Edit Group</h1>
      <h2>{{ fetchedName }}</h2>
      <form>
        <div class="form-group">
          <label for="nameInput">Group Name</label>
          <input class="form-control" id="nameInput" @input="updateName" :placeholder="groupName">
          <template v-for="error in errorsForNameField">
            <div class="text-danger top-buffer">{{ error }}</div>
          </template>
        </div>
        <div class="form-group">
          <label for="descriptionInput">Group Description</label>
          <textarea class="form-control" @input="updateDescription" aria-label="description" id="descriptionInput" rows="2" :placeholder="groupDescription"></textarea>
          <template v-for="error in errorsForDescriptionField">
            <div class="text-danger top-buffer">{{ error }}</div>
          </template>
        </div>
        <button class="btn btn-primary" v-on:click.prevent="submitGroupUpdate">Submit</button>
      </form>
      <button class="btn btn-danger top-buffer" v-on:click.prevent="deleteGroup">Delete Group</button>
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
    errorsForDescriptionField: function () {
      return this.$store.getters.errorsForDescriptionField;
    },
    errorsForNameField: function () {
      return this.$store.getters.errorsForNameField;
    },
    groupDescription: function () {
      return this.currentGroup.description;
    },
    groupId: function () {
      return this.$route.params.id;
    },
    groupName: function () {
      return this.currentGroup.name;
    },
    groupUrl: function () {
      return `/groups/${this.groupId}`;
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
    deleteGroup: function deleteGroup() {
      const message = 'Are you sure you want to delete this group? This action cannot be undone';
      if (confirm(message)) {
        this.$store.commit('CLEAR_ERRORS');
        this.$store.dispatch('deleteGroup', this.groupId)
          .then(() => {
            this.$router.push('/groups');
          }).catch(() => {});
      }
    },
    submitGroupUpdate: function submitGroupUpdate() {
      this.$store.commit('CLEAR_ERRORS');
      const updateParameters = { groupId: this.groupId, params: this.request_body };
      this.$store.dispatch('updateGroup', updateParameters)
        .then(() => {
          this.$router.push(this.groupUrl);
        }).catch(() => {});
    },
    updateDescription(e) {
      this.$store.commit('SET_FORM_DESCRIPTION_FIELD', e.target.value);
    },
    updateName(e) {
      this.$store.commit('SET_FORM_NAME_FIELD', e.target.value);
    },
  },
  mounted: function afterMount() {
    this.$store.dispatch('fetchGroup', this.groupId);
  },
};
</script>

<style scoped>
h1 {
  font-weight: normal;
  margin: 30px 0px 20px 0;
}
h2 {
  margin-bottom: 20px;
}
.top-buffer {
  margin-top:10px;
}
</style>
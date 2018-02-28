<template>
  <div class="group-create">
    <app-nav></app-nav>
    <div class="container col-xs-6 col-xs-offset-3">
      <h1>Create a new group</h1>
      <p>A group should encompass all of the people that you might want to aggregate data for. If you're a company, this would probably be the company name. You can always subdivide into teams and titles with labels within the group.</p>
      <p>If you're already in a group and want to collect data for your team, you probably want to create a new label for the group you're already in instead.</p>
      <form>
        <div class="form-group">
          <label for="nameInput">Group Name</label>
          <input class="form-control" id="nameInput" @input="updateName" placeholder="Group Name">
          <template v-for="error in errorsForNameField">
            <div class="text-danger top-buffer">{{ error }}</div>
          </template>
        </div>
        <div class="form-group">
          <label for="descriptionInput">Group Description</label>
          <textarea class="form-control" aria-label="description" id="descriptionInput" @input="updateDescription" rows="2" placeholder="Group Description (optional)"></textarea>
          <template v-for="error in errorsForDescriptionField">
            <div class="text-danger top-buffer">{{ error }}</div>
          </template>
        </div>
        <button class="btn btn-primary" v-on:click.prevent="submitGroupCreate">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import AppNav from '../AppNav';

export default {
  name: 'GroupCreate',
  components: {
    AppNav,
  },
  computed: {
    request_body: function () {
      return { group: {
        name: this.$store.getters.formFieldName,
        description: this.$store.getters.formFieldDescription,
      } };
    },
    errorsForDescriptionField: function () {
      return this.$store.getters.errorsForDescriptionField;
    },
    errorsForNameField: function () {
      return this.$store.getters.errorsForNameField;
    },
  },
  methods: {
    submitGroupCreate: function submitGroupCreate() {
      this.$store.commit('CLEAR_ERRORS');
      this.$store.dispatch('createGroup', this.request_body)
        .then((response) => {
          this.$router.push('/groups/' + response.data.group.id);
        }).catch(() => {});
    },
    updateDescription(e) {
      this.$store.commit('SET_FORM_DESCRIPTION_FIELD', e.target.value);
    },
    updateName(e) {
      this.$store.commit('SET_FORM_NAME_FIELD', e.target.value);
    },
  },
};
</script>

<style scoped>
h1 {
  font-weight: normal;
  margin: 30px 0px 20px 0;
}
.top-buffer {
  margin-top:10px;
}
</style>
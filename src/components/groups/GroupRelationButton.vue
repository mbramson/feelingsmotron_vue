<template>
  <div class="group-relation-button">
  </div>
</template>

<script>
export default {
  name: 'GroupRelationButton',
  data() {
    return {
      owner: '',
      invitation: [],
      users: [],
      status: 'notRequested'
    };
  },
  computed: {
    headers: function () {
      return this.$store.getters.requestHeaders;
    },
    isError: function () {
      return this.status === 'error';
    },
  },
};
</script>
<template>
  <div class="hello">
    <h1>Feelingsmotron</h1>
    <h3>Selected Feeling: {{ selectedFeeling }}</h3>
    <h3>Current Feeling: {{ feeling }}</h3>
    <ul>
      <li><button v-on:click="selectedFeeling = 1">1</button></li>
      <li><button v-on:click="selectedFeeling = 2">2</button></li>
      <li><button v-on:click="selectedFeeling = 3">3</button></li>
      <li><button v-on:click="selectedFeeling = 4">4</button></li>
      <li><button v-on:click="selectedFeeling = 5">5</button></li>
    </ul>
    <h4>{{ status}}</h4>
  </div>
</template>

<script>
import _ from 'lodash';
export default {
  name: 'HelloWorld',
  data() {
    return {
      selectedFeeling: 1,
      feeling: 1,
      status: '',
    };
  },
  watch: {
    selectedFeeling: function (newFeeling) {
      this.status = 'Waiting for you to settle on a feeling';
      this.setFeeling();
    },
  },
  methods: {
    setFeeling: _.debounce(
      function () {
        this.status = '';
        this.feeling = this.selectedFeeling;
      },
      1000, // milliseconds to wait
    ),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

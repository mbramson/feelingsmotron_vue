<template>
  <div class="hello">
    <h1>Feelingsmotron</h1>
    <h3>Selected Feelings: {{ selectedFeeling }}</h3>
    <h3>API Feelings: {{ feeling }}</h3>
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
import axios from 'axios';

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
    selectedFeeling: function selectedFeelingWatch() {
      this.status = 'Waiting for you to settle on a feeling';
      this.setFeeling();
    },
  },
  methods: {
    setFeeling: _.debounce(
      function setFeelings() {
        this.status = '';
        this.feeling = this.selectedFeeling;
      },
      1000, // milliseconds to wait
    ),
  },
  mounted: function afterMount() {
    const vm = this;
    this.status = 'Retrieving Feelings...';
    axios.get('http://localhost:4000/api/v1/feelings')
      .then((response) => {
        vm.feeling = response.data.feelings;
        vm.status = '';
      })
      .catch((error) => {
        vm.status = `Error! Could not retrieve Feelings from API: ${error}`;
      });
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

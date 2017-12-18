<template>
  <div class="feelings">
    <app-nav></app-nav>
    <h1 class="text-center">Feelingsmotron</h1>
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
import AppNav from './AppNav';

const feelingsUrl = 'http://localhost:4000/api/v1/feelings'

export default {
  name: 'Feelings',
  components: {
    AppNav,
  },
  data() {
    return {
      selectedFeeling: 1,
      feeling: 1,
      status: '',
    };
  },
  computed: {
    headers: function() {
      return this.$store.getters.requestHeaders
    },
    update_body: function() {
      return {
        feelings: this.selectedFeeling,
      };
    },
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
        const vm = this;
        this.status = 'Updating Feelings...';
        axios.post(feelingsUrl, this.update_body, this.headers)
          .then((response) => {
            vm.feeling = response.data.feelings;
            vm.status = 'Feeling Updated';
          })
          .catch((error) => {
            vm.status = `Error! Could not retrieve Feelings from API: ${error}`;
          });
      },
      1000, // milliseconds to wait
    ),
  },
  mounted: function afterMount() {
    const vm = this;
    this.status = 'Retrieving Feelings...';
    axios.get(feelingsUrl, this.headers)
      .then((response) => {
        vm.feeling = response.data.feelings;
        vm.status = 'Feelings Loaded';
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

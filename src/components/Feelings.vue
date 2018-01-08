<template>
  <div class="feelings">
    <app-nav></app-nav>
    <div class="container col-xs-4 col-xs-offset-4">
      <h1 class="text-center">Feelingsmotron</h1>
      <div id="feeling-selector" class="btn-group" data-toggle="buttons">
        <label class="btn btn-primary" v-bind:class="{ 'btn-success' : feeling === 1, active: selectedFeeling === 1 }">
          <input type="radio" name="options" id="option1" autocomplete="off" @click="selectedFeeling = 1" checked>1
        </label>
        <label class="btn btn-primary" v-bind:class="{ 'btn-success' : feeling === 2, active: selectedFeeling === 2 }">
          <input type="radio" name="options" id="option2" autocomplete="off" @click="selectedFeeling = 2" checked>2
        </label>
        <label class="btn btn-primary" v-bind:class="{ 'btn-success' : feeling === 3, active: selectedFeeling === 3 }">
          <input type="radio" name="options" id="option3" autocomplete="off" @click="selectedFeeling = 3" checked>3
        </label>
        <label class="btn btn-primary" v-bind:class="{ 'btn-success' : feeling === 4, active: selectedFeeling === 4 }">
          <input type="radio" name="options" id="option4" autocomplete="off" @click="selectedFeeling = 4" checked>4
        </label>
        <label class="btn btn-primary" v-bind:class="{ 'btn-success' : feeling === 5, active: selectedFeeling === 5 }">
          <input type="radio" name="options" id="option5" autocomplete="off" @click="selectedFeeling = 5" checked>5
        </label>
      </div>
      <div id="comment-field" class="form-group">
        <textarea class="form-control" aria-label="comment" id="commentInput" v-model="comment" rows="3" placeholder="Leave a comment (optional)"></textarea>
      </div>
      <button id="submit-button" class="btn btn-primary" v-on:click="submitFeelings">Submit</button>
      <dd>{{ status}}</dd>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import axios from 'axios';
import AppNav from './AppNav';

const feelingsUrl = 'http://localhost:4000/api/v1/feelings';

export default {
  name: 'Feelings',
  components: {
    AppNav,
  },
  data() {
    return {
      selectedFeeling: null,
      feeling: null,
      status: '',
      comment: '',
    };
  },
  computed: {
    headers: function () {
      return this.$store.getters.requestHeaders;
    },
    update_body: function () {
      return {
        feelings: this.selectedFeeling,
        comment: this.comment,
      };
    },
  },
  methods: {
    submitFeelings: _.throttle(
      function submitFeelings() {
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
      1000, // milliseconds to throttle
      { leading: true, trailing: true },
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
#comment-field {
  margin-top: 30px;
}
#feeling-selector {
  margin-top: 20px;
}
#submit-button{
  margin-top: 20px;
  margin-bottom: 20px;
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

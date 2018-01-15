import axios from 'axios';

const groupUrl = 'http://localhost:4000/api/v1/groups';

export default {
  getIndex(headers) {
    return axios.get(groupUrl, headers);
  },
};

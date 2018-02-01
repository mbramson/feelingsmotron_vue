import axios from 'axios';

const groupUrl = 'http://localhost:4000/api/v1/groups';

export default {
  getIndex(headers) {
    return axios.get(groupUrl, headers);
  },
  getGroup(headers, groupId) {
    const url = groupUrl + `/${groupId}`;
    return axios.get(url, headers);
  },
  updateGroup(headers, groupId, params) {
    const url = groupUrl + `/${groupId}`;
    return axios.put(url, params, headers);
  },
};

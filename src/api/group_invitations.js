import axios from 'axios';

const groupInvitationUrl = 'http://localhost:4000/api/v1/group_invitations';

export default {
  getInvitationIndex(headers) {
    return axios.get(groupInvitationUrl, headers);
  },
};

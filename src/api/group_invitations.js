import axios from 'axios';

const groupInvitationUrl = 'http://localhost:4000/api/v1/group_invitations';

export default {
  getIndex(headers) {
    return axios.get(groupInvitationUrl, headers);
  },
  requestMembership(headers, userId, groupId) {
    return axios.post(groupInvitationUrl, headers,
      {
        group_invitation: {
          user_id: userId,
          group_id: groupId,
          from_user: false,
        },
      });
  },
};

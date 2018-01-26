import axios from 'axios';

const groupInvitationUrl = 'http://localhost:4000/api/v1/group_invitations';

export default {
  getIndex(headers) {
    return axios.get(groupInvitationUrl, headers);
  },
  requestMembership(headers, userId, groupId) {
    const payload = {
      group_invitation: {
        user_id: userId,
        group_id: groupId,
        from_group: false,
      },
    };
    return axios.post(groupInvitationUrl, payload, headers);
  },
  deleteInvitation(headers, invitationId) {
    const url = `${groupInvitationUrl}/${invitationId}`;
    return axios.delete(url, headers);
  },
};

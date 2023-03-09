import Axios from 'axios';

const api = Axios.create({
  baseURL: '/api/',
});

const chatAPI = {
  getMessages: (groupId) => {
    console.log('Calling get messages from API');
    return api.get(`messages/${groupId}`);
  },

  sendMessage: (username, text, time) => {
    let msg = {
      sender: username,
      content: text,
      timestamp: time,
    };
    return api.post(`send`, msg);
  },
};

export default chatAPI;

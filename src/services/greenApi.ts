import axios from 'axios';

const BASE_URL = 'https://api.green-api.com';

export const sendMessage = async (idInstance: string, apiTokenInstance: string, phone: string, text: string) => {
  const response = await axios.post(`${BASE_URL}/waInstance${idInstance}/SendMessage/${apiTokenInstance}`, {
    chatId: `${phone}@c.us`,
    message: text,
  });
  return response.data;
};

export const receiveMessages = async (idInstance: string, apiTokenInstance: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`);
    console.log('API Response:', response.data);

    if (response.data && response.data.body) {
      const receiptId = response.data.receiptId;
      const messageData = response.data.body;

      await axios.delete(`${BASE_URL}/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${receiptId}`);

      if (messageData.typeWebhook === 'incomingMessageReceived') {
        const message = messageData.messageData?.textMessageData?.textMessage;
        const sender = messageData.senderData?.sender?.replace(/@c\.us/, '');

        if (message && sender) {
          return [{ id: receiptId, text: message, sender }];
        }
      }
    }
    return [];
  } catch (error) {
    console.error('Error receiving messages:', error);
    return [];
  }
};
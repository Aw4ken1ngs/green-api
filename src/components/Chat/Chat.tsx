import React, { useState, useEffect } from "react";
import AuthForm from "../AuthForm/AuthForm";
import MessageList from "../MessageList/MessageList";
import MessageInput from "../MessageInput/MessageInput";
import { sendMessage, receiveMessages } from "../../services/greenApi";
import styles from './Chat.module.css';

interface Message {
  id: string;
  text: string;
  isOutgoing: boolean;
}

const Chat: React.FC = () => {
  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');
  const [phone, setPhone] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const handleAuth = (idInstance: string, apiTokenInstance: string, phone: string) => {
    setIdInstance(idInstance);
    setApiTokenInstance(apiTokenInstance);
    setPhone(phone);
  };

  const handleSendMessage = async (text: string) => {
    await sendMessage(idInstance, apiTokenInstance, phone, text);
    setMessages([...messages, { id: Date.now().toString(), text, isOutgoing: true }]);
  };

  useEffect(() => {
    if (idInstance && apiTokenInstance) {
      const interval = setInterval(async () => {
        try {
          const newMessages = await receiveMessages(idInstance, apiTokenInstance);
          if (Array.isArray(newMessages) && newMessages.length > 0) {
            setMessages((prevMessages) => [
              ...prevMessages,
              ...newMessages.map((msg) => ({
                id: msg.id,
                text: msg.text,
                isOutgoing: false,
              })),
            ]);
          }
        } catch (error) {
          console.error('Error receiving messages:', error);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [idInstance, apiTokenInstance]);

  return (
      <div className={styles['chat-container']}>
        {!idInstance ? (
            <AuthForm onAuth={handleAuth} />
        ) : (
            <>
              <div className={styles['chat-header']}>WhatsApp Chat</div>
              <div className={styles['chat-messages']}>
                <MessageList messages={messages} />
              </div>
              <div className={styles['chat-input']}>
                <MessageInput onSend={handleSendMessage} />
              </div>
            </>
        )}
      </div>
  );
};

export default Chat;
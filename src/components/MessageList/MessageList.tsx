import React from 'react';
import styles from './MessageList.module.css';

interface Message {
  id: string;
  text: string;
  isOutgoing: boolean;
}

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
      <div className={styles['message-list']}>
        {messages.map((message) => (
            <div
                key={message.id}
                className={`${styles.message} ${
                    message.isOutgoing ? styles['message-outgoing'] : styles['message-incoming']
                }`}
            >
              {message.text}
            </div>
        ))}
      </div>
  );
};

export default MessageList;
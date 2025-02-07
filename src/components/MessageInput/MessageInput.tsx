import React, { useState } from 'react';
import styles from './MessageInput.module.css';

interface MessageInputProps {
    onSend: (text: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSend }) => {
    const [text, setText] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSend(text);
        setText('');
    };

    return (
        <form className={styles['message-input']} onSubmit={handleSubmit}>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type a message"
            />
            <button type="submit">Send</button>
        </form>
    );
};

export default MessageInput;
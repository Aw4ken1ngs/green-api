import React, { useState } from 'react';
import styles from './AuthForm.module.css';

interface AuthFormProps {
    onAuth: (idInstance: string, apiTokenInstance: string, phone: string) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onAuth }) => {
    const [idInstance, setIdInstance] = useState('');
    const [apiTokenInstance, setApiTokenInstance] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAuth(idInstance, apiTokenInstance, phone);
    };

    return (
        <form className={styles['auth-form']} onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="ID Instance"
                value={idInstance}
                onChange={(e) => setIdInstance(e.target.value)}
            />
            <input
                type="text"
                placeholder="API Token Instance"
                value={apiTokenInstance}
                onChange={(e) => setApiTokenInstance(e.target.value)}
            />
            <input
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            <button type="submit">Start Chat</button>
        </form>
    );
};

export default AuthForm;
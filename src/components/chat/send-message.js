import React, { useState } from 'react';

import styles from './styles.module.css';

import { IoMdSend } from 'react-icons/io';

const SendMessage = ({ socket, username, room }) => {
  const [message, setMessage] = useState('');
  const sendMessage = () => {
    if (message !== '') {
      const __createdtime__ = Date.now();
      // Send message to server. We can't specify who we send the message to from the frontend. We can only send to server. Server can then send message to rest of users in room
      socket.emit('send_message', { username, room, message, __createdtime__ });
      setMessage('');
    }
  };

  return (
    <div className={styles.sendMessageContainer}>
      <input
        className={styles.messageInput}
        placeholder='Message...'
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <button className={styles.btn} onClick={sendMessage}>
        <span className={styles.sendtext}>Send Message</span>
        <span className={styles.sendbutton}><IoMdSend/></span>
      </button>
    </div>
  );
};

export default SendMessage;
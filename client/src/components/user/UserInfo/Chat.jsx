import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL, getMemberId } from './LogIn/LogIn';
import styles from './Chat.module.css';

export default function Chat() {
  const [chatLog, setChatLog] = useState([]);
  const [memberNickName, setMemberNickName] = useState('');
  const [selectedChat, setSelectedChat] = useState([]);

  useEffect(() => {
    const memberId = getMemberId().memberId;

    axios.get(`${BASE_URL}/api/latter/${memberId}`).then((res) => {
      console.log(res.data.dataList);
      setChatLog(res.data.dataList);
    });

    axios.get(`${BASE_URL}/api/member/${memberId}`).then((res) => {
      console.log(res.data);
      setMemberNickName(res.data.nickName);
    });
  }, []);

  const handleChatClick = (chatGroup) => {
    setSelectedChat(chatGroup);
  };

  return (
    <div>
      {chatLog.map((chatGroup, idx) => (
        <div
          style={{ margin: '40px' }}
          className={styles.chatwrapper}
          key={idx}
          onClick={() => handleChatClick(chatGroup)}
        >
          {chatGroup.map((chat, idx) => (
            <div
              key={idx}
              className={chat.senderNickName === memberNickName ? styles.myChat : styles.otherChat}
            >
              {chat.content}
            </div>
          ))}
        </div>
      ))}

      {selectedChat.length > 0 && (
        <div>
          <h2>Selected Chat</h2>
          {selectedChat.map((chat, idx) => (
            <div
              key={idx}
              className={chat.senderNickName === memberNickName ? styles.myChat : styles.otherChat}
            >
              {chat.content}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

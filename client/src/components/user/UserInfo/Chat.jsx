import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL, getMemberId } from './LogIn/LogIn';
import styles from './Chat.module.css';

export default function Chat() {
  const [chatLog, setChatLog] = useState([]);
  const [memberNickName, setMemberNickName] = useState('');
  const [selectedChat, setSelectedChat] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const memberId = getMemberId().memberId;

    getChatLog(memberId);
    getUserNickName(memberId);
  }, []);

  useEffect(() => {
    getChatLog();
  }, [newMessage]);

  const getChatLog = async (memberId) => {
    await axios.get(`${BASE_URL}/api/latter/${memberId}`).then((res) => {
      console.log(res.data.dataList);
      setChatLog([...res.data.dataList]);
    });
  };

  const getUserNickName = (memberId) => {
    axios.get(`${BASE_URL}/api/member/${memberId}`).then((res) => {
      console.log(res.data);
      setMemberNickName(res.data.data.nickName);
      console.log(res.data.data.nickName);
    });
  };

  const handleChatClick = (chatGroup) => {
    setSelectedChat(chatGroup);
  };

  const handleSendMessage = async () => {
    const senderId = 1;
    const receiverId =
      selectedChat[0].senderId === senderId
        ? selectedChat[0].receiverId
        : selectedChat[0].senderId;

    const message = {
      senderId: senderId,
      receiverId: receiverId,
      content: newMessage,
    };

    try {
      await axios.post(`${BASE_URL}/api/latter`, message).then((res) => {
        setNewMessage('');
      });
      // 메시지 전송 후 필요한 작업 수행
      // 예: 메시지 목록 갱신
    } catch (error) {
      console.error(error);
      // 에러 처리
    }
  };

  return (
    <div className={styles.chat}>
      <div className={styles.chatLog}>
        {chatLog.map((chatGroup, idx) => {
          const otherNickName =
            chatGroup[0].senderNickName === memberNickName
              ? chatGroup[0].receiverNickName
              : chatGroup[0].senderNickName;
          return (
            <div
              style={{ margin: '40px' }}
              className={styles.chatwrapper}
              key={idx}
              onClick={() => handleChatClick(chatGroup)}
            >
              <div className={styles.chatHeader}>
                <div className={styles.nickname}>{otherNickName}</div>
              </div>
              <div>{chatGroup[0].content}</div>
            </div>
          );
        })}
      </div>
      {selectedChat.length > 0 && (
        <div className={styles.chattings}>
          <div>
            <h2 style={{ margin: '20px 0 40px 0' }}>
              {selectedChat[0].senderNickName === memberNickName
                ? selectedChat[0].receiverNickName
                : selectedChat[0].senderNickName}님과의 채팅
            </h2>
            {selectedChat.map((chat, idx) => {
              const timeString = chat.createTime;
              const time = timeString.substring(11, 16);
              return (
                <div>
                  <div
                    key={idx}
                    className={
                      chat.senderNickName === memberNickName
                        ? styles.myChat
                        : styles.otherChat
                    }
                  >
                    {chat.content}
                  </div>
                  <div className={
                      chat.senderNickName === memberNickName
                        ? styles.myTime
                        : styles.otherTime
                    }>
                    {time}
                  </div>
                </div>
              )
            })}
          </div>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className={styles.input}
            />
            <button onClick={handleSendMessage}
            className={styles.button}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}
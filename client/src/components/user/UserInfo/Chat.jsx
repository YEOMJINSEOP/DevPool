import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL, getMemberId } from './LogIn/LogIn';
import styles from './Chat.module.css';
import { useNavigate } from 'react-router-dom';

export default function Chat() {
  const [chatLog, setChatLog] = useState([]);
  const [memberNickName, setMemberNickName] = useState('');
  const [selectedChat, setSelectedChat] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const navigate = useNavigate();
  const memberId = getMemberId().memberId;

  useEffect(() => {
    const memberId = getMemberId().memberId;
    getChatLog(memberId);
    getUserNickName(memberId);
  }, []);

  useEffect(() => {
    getChatLog(memberId);
  }, [newMessage]);

  const getChatLog = async(memberId) => {
    console.log(chatLog)
    await axios.get(`${BASE_URL}/api/latter/${memberId}`).then((res) => {
      console.log(res.data.dataList);
      const dataList = res.data.dataList;
      setChatLog([...dataList]);
    });
  };

  const getUserNickName = (memberId) => {
    axios.get(`${BASE_URL}/api/member/${memberId}`).then((res) => {
      setMemberNickName(res.data.data.nickName);
    });
  };

  const handleChatClick = (chatGroup) => {
    setSelectedChat(chatGroup);
  };

  const handleSendMessage = async () => {
    const senderId = memberId;
    const receiverId =
      selectedChat[0].senderId === senderId
        ? selectedChat[0].receiverId
        : selectedChat[0].senderId;

    const message = {
      senderId: senderId,
      receiverId: receiverId,
      content: newMessage,
    };

    console.log(senderId);
    console.log(receiverId);

    if(newMessage == null) {
      return;
    }

    try {
      await axios.post(`${BASE_URL}/api/latter`, message).then((res) => {
        setNewMessage(prevMessage => '');
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
        {chatLog.length === 0 ? (
          <div style={{padding: "80px"}}>
            <div className={styles.noMessages} style={{fontSize: "21px"}}>보낸 쪽지가 없습니다.</div>
            <div 
            onClick={()=>navigate('/')}
            style={{cursor: "pointer", marginTop: "30px", color: "#F25022"}}>메인 페이지로 이동</div>
          </div>
        ) :
        chatLog.map((chatGroup, idx) => {
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
      <div
      className={chatLog.length > 0 ? 'box' : 'none'}>
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
                <div style={{margin: "18px"}} 
                className={
                  chat.senderNickName === memberNickName
                    ? styles.myWrapper
                    : styles.otherWrapper
                }>
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
                    }
                    style={{marginTop: "6px"}}>
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
              onChange={(e) => {setNewMessage(e.target.value); getChatLog(memberId);}}
              className={styles.input}
            />
            <button onClick={handleSendMessage}
            className={styles.button}>Send</button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
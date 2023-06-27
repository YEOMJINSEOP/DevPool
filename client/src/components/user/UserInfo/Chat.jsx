import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL, getMemberId } from './LogIn/LogIn';
import styles from './Chat.module.css';
import { useNavigate } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";

export default function Chat() {
  const [chatLog, setChatLog] = useState([]);
  const [memberNickName, setMemberNickName] = useState('');
  const [selectedChat, setSelectedChat] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [clickedChat, setClickedChat] = useState();
  const [memberPools, setMemberPools] = useState();
  const navigate = useNavigate();
  const memberId = getMemberId().memberId;

  useEffect(() => {
    const memberId = getMemberId().memberId;
    getChatLog(memberId);
    getUserNickName(memberId);
    axios.get(`${BASE_URL}/api/member-pools`)
    .then((res) => {
      console.log(res);
      setMemberPools(res.data.dataList)
    })
  }, []);

  useEffect(() => {
    getChatLog(memberId);
  }, [newMessage]);

  const { isLoading, isError, stateQueryData } =
    useQuery(
      ["chatLog"],
      () => {
          getChatLog(memberId);
      },
      {
        refetchOnWindowFocus: true,
        refetchInterval: 500,
        refetchIntervalInBackground: true,
        retry: 0,
      }
    );

  const getChatLog = async(memberId) => {
    console.log(chatLog)
    await axios.get(`${BASE_URL}/api/latter/${memberId}`).then((res) => {
      const dataList = res.data.dataList;
      setChatLog([...dataList]);
    }).then(() => {
      if(clickedChat != undefined) {
        setSelectedChat(chatLog[clickedChat]);
      }
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

    if(newMessage == "") {
      alert("내용을 입력해주세요")
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
        <h2 style={{margin: "20px", paddingBottom: "12px", borderBottom: "2px solid lightgray"}}>채팅방 목록</h2>
        {chatLog.length === 0 ? (
          <div style={{padding: "80px"}}>
            <div className={styles.noMessages} style={{fontSize: "21px"}}>보낸 쪽지가 없습니다.</div>
            <div
            onClick={()=>navigate('/')}
            style={{cursor: "pointer", marginTop: "30px", color: "#F25022"}}>메인 페이지로 이동</div>
          </div>
        ) :
        chatLog.map((chatGroup, idx) => {
          var userUrl = [{
            imageUrl: "abcd"
          }]
          const otherNickName =
            chatGroup[0].senderNickName === memberNickName
              ? chatGroup[0].receiverNickName
              : chatGroup[0].senderNickName;
              const otherId =
              chatGroup[0].senderId === memberId
                ? chatGroup[0].receiverId
                : chatGroup[0].senderId;
                console.log(otherId);
                console.log(typeof otherId);
              if(memberPools != null && otherId != undefined) {
                userUrl = memberPools.filter((data) => data.memberId == otherId);
              }
              console.log(userUrl);
          return (
            <div
              style={{ margin: '14px 32px' }}
              className={styles.chatwrapper}
              key={idx}
              onClick={() => {
                handleChatClick(chatGroup);
                setClickedChat(idx);
              }}
            >
              <div style={{display: "flex"}}>
              {userUrl && <img src={userUrl[0].imageUrl} alt='유저 이미지' style={{width: "60px", height: "60px", borderRadius: "100%", alignSelf: 'center', padding: '4px'}}/>}
                <div style={{marginLeft: "17px"}}>
                  <div className={styles.chatHeader}>
                    <div className={styles.nickname}>{otherNickName}</div>
                  </div>
                  <div>{`{${chatGroup[0].content}}`}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div
      className={chatLog.length > 0 ? 'box' : 'none '}>
      {selectedChat.length > 0 ? (
        <>
        <div className={styles.chattings}>
          <div style={{display: "flex", flexDirection: "column", minHeight: '535px'}}>
            <h2 style={{ margin: '20px 0 30px 0', textAlign: 'center', borderBottom: "solid 2px lightgray", paddingBottom: "12px" }}>
              {selectedChat[0].senderNickName === memberNickName
                ? selectedChat[0].receiverNickName
                : selectedChat[0].senderNickName}님과의 채팅
            </h2>
            {selectedChat.map((chat, idx) => {
              const timeString = chat.createTime;
              const time = timeString.substring(11, 16);
              return (
                <div style={{margin: "7px 12px"}} 
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
       </>
      ) : <div style={{padding: "50px"}}>선택된 쪽지가 없습니다.</div>}
      </div>
    </div>
  );
}
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL, getMemberId } from './LogIn/LogIn'
import styles from './Chat.module.css';

export default function Chat() {
  
  const [chatLog, setChatLog] = useState();
  const [memberNickName, setMemberNickName] = useState();

  useEffect(() => {
    const id = getMemberId().memberId
    // 추후 1 들어간 부분에 id 가져오기
    axios.get(`${BASE_URL}/api/latter/1`).then((res) => {
      console.log(res.data.dataList);
      setChatLog(res.data.dataList);
    })
    axios.get(`${BASE_URL}/api/member/1`).then((res) => {
      console.log(res.data.data.nickName);
      setMemberNickName(res.data.data.nickName);
    })
  }, [])

  return (
    <div>
      {chatLog && chatLog.map((chat, idx) => {
        return (
          <div style={{margin: '40px'}} className={styles.chatwrapper} key={idx}>
            {chat.map((item, idx) => {
              if(memberNickName == item.senderNickName) {
                return (
                  <div key={idx} className={styles.myChat}>{item.content}</div>
                )
              }
              else {
                return (
                  <div key={idx} className={styles.otherChat}>{item.content}</div>
                )
              }
            })}
          </div>
        )
      })}
    </div>
  )
}
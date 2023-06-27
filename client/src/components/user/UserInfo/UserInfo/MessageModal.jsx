import { useEffect, useState } from 'react';
import styles from './MessageModal.module.css'
import axios from 'axios';
import { BASE_URL } from './UserInfo';
import { getMemberId } from '../LogIn/LogIn';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { useRecoilState } from 'recoil';
import { isLoggedIn } from '../../../../recoil/user';
import { useNavigate } from 'react-router-dom';
import messageImg from '../img/messageIcon.png'

export default function MessageModal({ receiverId }) {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [login, setIslogin] = useRecoilState(isLoggedIn);
    const navigate = useNavigate();
  
    const openModal = () => {
      setIsOpen(true);
    };
  
    const closeModal = () => {
      setIsOpen(false);
    };
  
    const handleSendMessage = () => {
      if(login == false) {
        alert('채팅을 시작하려면 로그인이 필요합니다');
        navigate('/login');
        return;
      }
      const senderId = getMemberId().memberId;
  
      const newMessage = {
        senderId: senderId,
        receiverId: receiverId,
        content: message,
      };

      console.log(senderId);
      console.log(receiverId);

      if(message == "") {
        alert("내용을 입력해주세요")
        return;
      } else {
        axios.post(`${BASE_URL}/api/latter`, newMessage)
        .then((res) => {
          console.log(res);
          setIsOpen(false);
        });
      }
      
    };
  
    return (
      <div>
        <button onClick={openModal} className={styles.message_btn}>채팅<img src={messageImg} alt='채팅 사진' style={{width: "28px", height: "28px", marginLeft: "8px"}}/></button>
        {isOpen && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <div>
                <h2 style={{ marginBottom: '12px' }}>채팅</h2>
              </div>
              <div>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder='메세지를 입력해주세요'
                />
              </div>
              <button
                className={styles.modalClose}
                onClick={handleSendMessage}
              >
                전송
              </button>
              <button className={styles.modalClose} onClick={closeModal}>
                CLOSE
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
import { useEffect, useState } from 'react';
import styles from './MessageModal.module.css'
import axios from 'axios';
import { BASE_URL } from './UserInfo';
import { getMemberId } from '../LogIn/LogIn';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

export default function MessageModal({ receiverId }) {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
  
    const openModal = () => {
      setIsOpen(true);
    };
  
    const closeModal = () => {
      setIsOpen(false);
    };
  
    const handleSendMessage = () => {
      const senderId = getMemberId().memberId;
      console.log(senderId);
  
      const newMessage = {
        senderId: senderId,
        receiverId: receiverId,
        content: message,
      };
  
      axios.post(`${BASE_URL}/api/latter`, newMessage)
        .then((res) => {
          console.log(res);
          setIsOpen(false);
        });
    };
  
    return (
      <div>
        <button onClick={openModal} className={styles.message_btn}>쪽지 보내기<MailOutlineIcon/></button>
        {isOpen && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <div>
                <h2 style={{ marginBottom: '12px' }}>쪽지</h2>
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
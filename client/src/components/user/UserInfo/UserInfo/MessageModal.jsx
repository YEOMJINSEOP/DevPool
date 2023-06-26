import { useEffect, useState } from 'react';
import styles from './MessageModal.module.css'
import axios from 'axios';
import { BASE_URL } from './UserInfo';
import { getMemberId } from '../LogIn/LogIn';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useRecoilState } from 'recoil';
import { isLoggedIn } from '../../../../recoil/user';
import { useNavigate } from 'react-router-dom';

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
        alert('쪽지를 보내려면 로그인이 필요합니다');
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
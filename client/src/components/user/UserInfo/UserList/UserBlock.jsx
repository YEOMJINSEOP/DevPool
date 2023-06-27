import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import StackField from '../StackField';
import styles from './UserBlock.module.css';
import { BASE_URL } from '../../UserInfo/UserInfo/UserInfo';
import { getMemberId } from '../LogIn/LogIn';
import { useNavigate } from 'react-router-dom';
import messageImg from '../img/messageIcon.png';
import { useRecoilState } from 'recoil';
import { isLoggedIn } from '../../../../recoil/user';

const techField = [
  {
    name: 'Front-end',
    icon: <div className={styles.recruitFieldIcon}>Front-end</div>,
  },
  {
    name: 'Back-end',
    icon: <div className={styles.recruitFieldIcon}>Back-end</div>,
  },
  {
    name: "Android",
    icon: <div className={styles.recruitFieldIcon}>Android</div>,
  },
  {
    name: "IOS",
    icon: <div className={styles.recruitFieldIcon}>IOS</div>,
  },
  {
    name: "AI",
    icon: <div className={styles.recruitFieldIcon}>AI</div>,
  }
];

export default function UserBlock({ user }) {

  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [login, setIslogin] = useRecoilState(isLoggedIn);
  const navigate = useNavigate();

  const textareaRef = useRef(null);

  const openModal = (e) => {
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
    const receiverId = user.memberId;

    const newMessage = {
      senderId: senderId,
      receiverId: receiverId,
      content: message,
    };

    if(message == "") {
      alert("내용을 입력해주세요.")
    } else {
      axios.post(`${BASE_URL}/api/latter`, newMessage)
      .then((res) => {
        console.log(res);
        setIsOpen(false);
      });
    }
    

  };

  const navToUserInfo = () => {
    navigate(`/user/info/${user.memberId}`, {
      state: user,
    });
  };

  console.log(user);

  const userStack = user.stack.slice(0, 5).map((item) => item.name);
  const displayedTechFields = user.techField.slice(0, 2);

  return (
    <div className={isOpen ? styles.userBlockWrapper : styles.userBlockWrap}
    onClick={isOpen ? null : navToUserInfo}>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <img className={styles.user_img} src={user.imageUrl} alt="" />
        <div style={{marginLeft: "12px", width: "210px"}}>
          <div style={{ display: 'flex' }}>
            <h3 className={styles.user_nickName} style={{ margin: 'auto' }}>
              {user.nickName}
            </h3>
            <button className={styles.mailBtn} onClick={(e) => {
              openModal(e);
              e.stopPropagation();
            }}>
              <img src={messageImg} alt="채팅 사진" style={{ width: '25px', height: '25px' }} />
            </button>
            <div>
            {isOpen && (
              <div className={styles.modal}
              onClick={(e) => {
                e.stopPropagation();
              }}>
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
          </div>
          <div style={{ marginTop: '16px', display: "flex"}}>
            {displayedTechFields.map((field) => {
              const matchingField = techField.find((tech) => tech.name === field.name);
              return matchingField && matchingField.icon;
            })}
          </div>
        </div>
      </div>
      <div className={styles.userBlockStackFiled}>
        {userStack && <StackField selectedStack={userStack} />}
      </div>
    </div>
  );
}
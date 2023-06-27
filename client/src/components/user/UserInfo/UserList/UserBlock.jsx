import React from 'react';
import StackField from '../StackField';
import styles from './UserBlock.module.css';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { useNavigate } from 'react-router-dom';
import messageImg from '../img/messageIcon.png';

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
  const navigate = useNavigate();
  const navToUserInfo = () => {
    navigate(`/user/info/${user.memberId}`, {
      state: user,
    });
  };

  console.log(user);

  const userStack = user.stack.slice(0, 5).map((item) => item.name);
  const displayedTechFields = user.techField.slice(0, 2);

  return (
    <div className={styles.userBlockWrapper} onClick={navToUserInfo}>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <img className={styles.user_img} src={user.imageUrl} alt="" />
        <div style={{marginLeft: "12px", width: "210px"}}>
          <div style={{ display: 'flex' }}>
            <h3 className={styles.user_nickName} style={{ margin: 'auto' }}>
              {user.nickName}
            </h3>
            <button className={styles.mailBtn}>
              <img src={messageImg} alt="채팅 사진" style={{ width: '25px', height: '25px' }} />
            </button>
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
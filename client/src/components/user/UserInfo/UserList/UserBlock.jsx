import React from 'react'
import StackField from '../StackField'
import styles from './UserBlock.module.css'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useNavigate } from 'react-router-dom';

export default function UserBlock({ user }) {
  const navigate = useNavigate();
  const navToUserInfo = () => {
    navigate(`/user/info/${user.memberId}`, {
      state: user
    });
  }
  
  const userStack = [];
  user.stack.map((item) => {
    userStack.push(item.name);
  })
  
  return (
    <div className={styles.userBlockWrapper} onClick={navToUserInfo}>
        <div style={{display: 'flex'}}>
            <span className={styles.user_img}></span>
            <h3>
                {user.email}
            </h3>
            <button className={styles.mailBtn}><MailOutlineIcon />쪽지 보내기</button>
        </div>
        <div className={styles.userBlockStackFiled}>
            {userStack && <StackField selectedStack={userStack} />}
        </div>
    </div>
  )
}

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
  user.stack.slice(0, 5).map((item) => {
    userStack.push(item.name);
  })
  
  return (
    <div className={styles.userBlockWrapper} onClick={navToUserInfo}>
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
            <img className={styles.user_img} src={user.imageUrl}/>
            <h3 className={styles.user_nickName}>
                {user.nickName}
            </h3>
            <button className={styles.mailBtn}><MailOutlineIcon /></button>
        </div>
        <div className={styles.userBlockStackFiled}>
            {userStack && <StackField selectedStack={userStack} />}
        </div>
    </div>
  )
}

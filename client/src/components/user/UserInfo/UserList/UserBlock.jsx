import React from 'react'
import StackField from '../StackField'
import styles from './UserBlock.module.css'
import MailOutlineIcon from '@mui/icons-material/MailOutline';

export default function UserBlock({ user }) {
  return (
    <div className={styles.userBlockWrapper}>
        <div style={{display: 'flex'}}>
            <span className={styles.user_img}></span>
            <h3>
                {user.name}
            </h3>
            <button className={styles.mailBtn}><MailOutlineIcon />쪽지 보내기</button>
        </div>
        <div className={styles.userBlockStackFiled}>
            <StackField selectedStack={user.stack} />
        </div>
    </div>
  )
}

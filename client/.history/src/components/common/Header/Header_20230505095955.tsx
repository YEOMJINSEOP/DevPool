import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

function Header(){
  const navigate = useNavigate();
  return(
    <div className={styles.header}>
      <button className={styles.logo} onClick={() => navigate('/')}>DevPool</button>
      <div className={styles.category_container}>
        <button onClick={() => navigate('/')}>팀원 구하기</button>
        <div className={styles.divider}></div>
        <button onClick={() => navigate('/team/list')}>팀 구하기</button>        
        <div className={styles.divider}></div>
        <button onClick={() => navigate('/team/create')}>팀 모집하기</button>
      </div>
      <div className={styles.loginAndUser_container}>
        <button onClick={()=>navigate('/logIn')}>로그인</button>
      </div>
    </div>
  )
};

export default Header;
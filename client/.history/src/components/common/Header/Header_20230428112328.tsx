import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

function Header(){
  const navigate = useNavigate();
  return(
    <div className={styles.header}>
      <button onClick={() => navigate('/')}>DevPool</button>
      <div className={styles.category_container}>
        <button>팀원 구하기</button>
        <button onClick={() => navigate('/teamList')}>팀 구하기</button>        
        <button onClick={() => navigate('/teamForm')}>팀 모집하기</button>
      </div>
      <div className={styles.loginAndUser}>
        <button>로그인</button>
      </div>
    </div>
  )
};

export default Header;
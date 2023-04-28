import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

function Header(){
  const navigate = useNavigate();
  return(
    <div className={styles.header}>
      <h2>DevPool</h2>
      <div className={styles.category_container}>
        <button onClick={() => navigate('/')}>홈</button>
        <button>팀원 찾기</button>
        <button onClick={() => navigate('/teamList')}>팀 모집</button>        
        <button>쪽지함</button>
      </div>
      <div className={styles.loginAndUser}>
        <button>로그인</button>
      </div>
    </div>
  )
};

export default Header;
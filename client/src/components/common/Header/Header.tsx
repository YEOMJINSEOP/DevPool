import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import { useRecoilState } from 'recoil';
import { isLoggedIn } from '../../../recoil/user';

function Header(){
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useRecoilState(isLoggedIn);

  return(
    <div className={styles.header}>
      <button className={styles.logo} onClick={() => navigate('/')}>DevPool</button>
      <div className={styles.category_container}>
        <button onClick={() => navigate('/user/list')}>팀원 구하기</button>
        <div className={styles.divider}></div>
        <button onClick={() => navigate('/team/list')}>팀 구하기</button>        
        <div className={styles.divider}></div>
        <button onClick={() => navigate('/team/create')}>팀 모집하기</button>
      </div>
      <div className={styles.loginAndUser_container}>
        {loggedIn ? 
        <button onClick={()=>{navigate('/'); setLoggedIn(false); alert('로그아웃 되었습니다')}}>
          로그아웃
        </button> : 
        <button onClick={()=>navigate('/logIn')}>
          로그인
        </button>}
      </div>
    </div>
  )
};

export default Header;
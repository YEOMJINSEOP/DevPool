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
        <button onClick={() => {
          loggedIn ? navigate('/team/list') : alert('로그인이 필요합니다!');
        }}>팀 구하기</button>        
        <div className={styles.divider}></div>
        <button onClick={() => {
          loggedIn ? navigate('/team/create') : alert('로그인이 필요합니다!');
        }}>팀 모집하기</button>
        <div className={styles.divider}></div>
        <button onClick={()=> navigate('teamMaker')}>랜덤 팀 메이커</button>
        <div className={styles.divider}></div>
        <button onClick={()=> navigate('/ai/project-recommend')}>AI 프로젝트 추천</button>
      </div>
      <div className={styles.loginAndUser_container}>
        {loggedIn ? (
        <>
          <button 
          className={styles.sharedButtonStyle} 
          onClick={() => {
            navigate('/chat');
          }}>
            쪽지함
          </button>
          <button
            className={`${styles.sharedButtonStyle} ${styles.logoutButton}`}
            onClick={() => {
              navigate('/');
              setLoggedIn(false);
              alert('로그아웃 되었습니다');
            }}
          >
            로그아웃
          </button>
        </>
        ) : (
        <button className={styles.sharedButtonStyle} onClick={() => navigate('/logIn')}>
          로그인
        </button>
        )}
      </div>
    </div>
  )
};

export default Header;
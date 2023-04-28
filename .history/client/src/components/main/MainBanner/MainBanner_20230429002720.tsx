import { useNavigate } from 'react-router-dom';
import styles from './MainBanner.module.css';

function MainBanner() {
  
  const navigate = useNavigate();
  
  const navigateToSignUp = () => {
    navigate('/logIn');
  }

  return (
    <>
      <div className={styles.main}>
        <div className={styles.bannerContainer}>
          <div className={styles.bannerSlogan}>Find Your Teammate in Univ.</div>
          <button className={styles.bannerSignUp} onClick={navigateToSignUp}>Sign Up</button>    
        </div>
      </div>
    </>
  );
}

export default MainBanner;
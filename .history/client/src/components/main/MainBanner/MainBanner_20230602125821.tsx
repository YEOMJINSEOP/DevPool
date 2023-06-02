import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MainBanner.module.css';
import { BASE_URL, getMemberId } from '../../user/UserInfo/LogIn/LogIn';
import axios from 'axios';

function MainBanner() {
  
  const navigate = useNavigate();
  
  const navigateToSignUp = () => {
    navigate('/logIn');
  }

  useEffect(() => {
    axios.get('http://15.164.82.94/recruit/info')
    .then(console.log)
  },[])

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
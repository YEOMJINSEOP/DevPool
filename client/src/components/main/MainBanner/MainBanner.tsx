import styles from './MainBanner.module.css';

function MainBanner() {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.bannerContainer}>
          <div className={styles.bannerSlogan}>Find Your Teammate in Univ.</div>
          <button className={styles.bannerSignUp}>Sign Up</button>    
        </div>
      </div>
    </>
  );
}

export default MainBanner;
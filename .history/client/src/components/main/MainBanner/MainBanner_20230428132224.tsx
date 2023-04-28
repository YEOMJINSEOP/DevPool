import styles from './MainBanner.module.css';

function MainBanner() {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.banner}>Find Your Teammate in Univ.</div>
        <button className={styles.bannerSignUp}>Sign Up</button>
      </div>
    </>
  );
}

export default MainBanner;
import styles from './MainBanner.module.css';

function MainBanner() {
  return (
    <div className={styles.main}>
      <img src="/image/banner.jpg" alt="banner"/>
    </div>
  );
}

export default MainBanner;
import styles from './MainBanner.module.css';

function MainBanner() {
  return (
    <div className={styles.main}>
      <Image src="/image/banner.jpg" alt="banner"/>
    </div>
  );
}

export default MainBanner;
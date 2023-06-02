import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MainBanner.module.css';
import { BASE_URL, getMemberId } from '../../user/UserInfo/LogIn/LogIn';
import axios from 'axios';

function MainBanner() {
  
  const navigate = useNavigate();
  
  const navigateToSignUp = () => {
    navigate('/logIn');
  }
  
  interface RecruitInfo {
    company: string,
    data: string
  }

  const [recruitInfoList, setRecruitInfoList] = useState<RecruitInfo[]>([]);

  useEffect(() => {
    axios.get('http://15.164.82.94/recruit/info')
      .then((res) => setRecruitInfoList(res.data))
      .catch(console.error)
  },[])

  useEffect(() => {
    console.log(recruitInfoList)
  }, [recruitInfoList]);

  return (
    <div className={styles.mainContainer}>
      {/* <div className={styles.main}>
        <div className={styles.bannerContainer}>
          <div className={styles.bannerSlogan}>Find Your Teammate in Univ.</div>
          <button className={styles.bannerSignUp} onClick={navigateToSignUp}>Sign Up</button>    
        </div>
      </div> */}
      <div className={styles.recruitContainer}>
        <div>🔥최신 채용 공고</ㅇ>
        <ul className={styles.recruitInfoList}>
          {recruitInfoList.map((recruitInfo) => (
            <li className={styles.recruitInfoBlock}>
              <p className={styles.recruitTitle}>{recruitInfo.company}</p>
              <p className={styles.recruitContent}>{recruitInfo.data}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.rankingContainer}>

      </div>
    </div>
  );
}

export default MainBanner;
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

  interface BaekJoonInfo {
    userId: string
    nickname: string | null
    solvedCount: number
  } 

  const [recruitInfoList, setRecruitInfoList] = useState<RecruitInfo[]>([]);
  const [baekJoonRank, setBaekJoonRank] = useState<BaekJoonInfo[]>([]);
  useEffect(() => {
    axios.get('http://15.164.82.94/recruit/info')
      .then((res) => setRecruitInfoList(res.data))
      .catch(console.error)

    axios.get('http://52.79.36.138/rank')
      .then((res) => setBaekJoonRank(res.data))
  },[])

  useEffect(() => {
    console.log(recruitInfoList)
  }, [recruitInfoList]);

  useEffect(() => {
    console.log(baekJoonRank);
  }, [baekJoonRank])

  return (
    <div className={styles.mainContainer}>
      {/* <div className={styles.main}>
        <div className={styles.bannerContainer}>
          <div className={styles.bannerSlogan}>Find Your Teammate in Univ.</div>
          <button className={styles.bannerSignUp} onClick={navigateToSignUp}>Sign Up</button>    
        </div>
      </div> */}
      <div className={styles.recruitContainer}>
        <div className={styles.title}>👨🏻‍💻 최신 채용 공고 👨🏻‍💻</div>
        <ul className={styles.recruitInfoList}>
          {recruitInfoList.map((recruitInfo) => (
            <li className={styles.recruitInfoBlock}>
              <a className={styles.anchorTag}href={`${recruitInfo.company === 'LINE' ? 'https://careers.linecorp.com/ko/jobs?ca=All&ci=Seoul,Bundang&co=East%20Asia' : 'https://recruit.navercorp.com/rcrt/list.do' }`}>                
                <img className={styles.companyLogo} src={`/image/${recruitInfo.company === 'LINE' ? 'line.png' : 'naver.png'}`} alt="logo" />
                <div className={styles.contentBox}>
                  <p className={styles.recruitTitle}>{recruitInfo.company}</p>
                  <div className={styles.divider}></div>
                  <p className={styles.recruitContent}>{recruitInfo.data}</p>
                </div>
              </a>              
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.rankingContainer}>
        <div className={styles.title}>🔥 백준 알고리즘 랭킹 🔥</div>
          <ul className={styles.rankingList}>
            {baekJoonRank.map((info, idx) => (
              <li className={styles.rankingBlock}>
                <p className={styles.crown}>{idx === 0 ? '👑' : ' '}</p>
                <p className={styles.rankingId}>{info.userId}</p>
                <div className={styles.rankingSolvedCount}>
                  <span>Solved: {info.solvedCount}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
    </div>
  );
}

export default MainBanner;
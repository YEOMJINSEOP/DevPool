import { useCallback, useEffect, useState } from 'react';
import {Configuration, OpenAIApi} from 'openai';
import styles from './ProjectRecom.module.css';
import axios from 'axios';

function ProjectRecom(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete]= useState(false);
  const [recommendation, setRecommenadation] = useState('')
  const handleRecommend = (selectedCategory) => {
    setIsLoading(true);
    axios.get(`http://13.124.144.38/recommend/${selectedCategory}`)
    .then((res) => {
      setRecommenadation(res.data.content);
      setIsLoading(false);
      setIsComplete(true);
    })
    .catch(console.error)
  }

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className={styles.spinner}>
          <div className={styles.rect1}></div>
          <div className={styles.rect2}></div>
          <div className={styles.rect3}></div>
          <div className={styles.rect4}></div>
          <div className={styles.rect5}></div>
        </div>
      );
    } else {
      return (
        <div>
          Recommendation: {recommendation}
        </div>
      );
    }
  }

  return (
    <div>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>🤖 AI 프로젝트 추천받기 🤖</h2>
        <div className={styles.divider}></div>
      </div>      
      
      <div className={styles.categoryContainer}>
        <div className={styles.categoryBox} onClick={() => handleRecommend('web')}>
          <img className={styles.categoryLogo} src="/image/internet.png" alt="Web" />
          <p>WEB</p>
        </div>
        <div className={styles.categoryBox} onClick={() => handleRecommend('mobile')}>
          <img className={styles.categoryLogo} src="/image/mobile-app.png" alt="Mobile App" />
          <p>MOBILE APP</p>
        </div>
        <div className={styles.categoryBox} onClick={() => handleRecommend('ai')}>
          <img className={styles.categoryLogo} src="/image/ai.png" alt="AI" />
          <p>AI</p>
        </div>
        <div className={styles.categoryBox} onClick={() => handleRecommend('bigdata')}>
          <img className={styles.categoryLogo} src="/image/big-data.png" alt="Big Data" />
          <p>BIG DATA</p>
        </div>
      </div>
      <div className={styles.content}>
        {renderContent()}
      </div>
      {/* <div className={styles.btnContainer}>
        <button className={styles.recommendBtn}>AI 프로젝트 추천받기</button>
      </div> */}
    </div>
  )
}

export default ProjectRecom;
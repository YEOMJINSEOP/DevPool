import { useCallback, useEffect, useState } from 'react';
import {Configuration, OpenAIApi} from 'openai';
import styles from './ProjectRecom.module.css';

function ProjectRecom(props) {
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <div>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>AI 프로젝트 추천받기</h2>
        <div className={styles.divider}></div>
      </div>      
      
      <div className={styles.categoryContainer}>
        <div className={styles.categoryBox}>
          <img className={styles.categoryLogo} src="/image/internet.png" alt="Web" />
          <p>WEB</p>
        </div>
        <div className={styles.categoryBox}>
          <img className={styles.categoryLogo} src="/image/mobile-app.png" alt="Mobile App" />
          <p>MOBILE APP</p>
        </div>
        <div className={styles.categoryBox}>
          <img className={styles.categoryLogo} src="/image/ai.png" alt="AI" />
          <p>AI</p>
        </div>
        <div className={styles.categoryBox}>
          <img className={styles.categoryLogo} src="/image/big-data.png" alt="Big Data" />
          <p>BIG DATA</p>
        </div>
      </div>
      <div className={styles.btnContainer}>
        <button className={styles.recommendBtn}>AI 프로젝트 추천받기</button>
      </div>
    </div>
  )
}

export default ProjectRecom;
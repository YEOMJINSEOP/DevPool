import { useCallback, useEffect } from 'react';
import {Configuration, OpenAIApi} from 'openai';
import styles from './ProjectRecom.module.css';

function ProjectRecom(props) {
  return (
    <div>
      <div className={styles.categoryContainer}>
        <div className={styles.category}>
          <img className={styles.categoryLogo} src="/image/internet.png" alt="Web" />
          <p>WEB</p>
        </div>
        <div className={styles.category}>
          <img className={styles.categoryLogo} src="/image/mobile-app.png" alt="Mobile App" />
          <p>MOBILE APP</p>
        </div>
        <div className={styles.category}>
          <img className={styles.categoryLogo} src="/image/ai.png" alt="AI" />
          <p>AI</p>
        </div>
        <div className={styles.category}>
          <img className={styles.categoryLogo} src="/image/big-data.png" alt="Big Data" />
          <p>BIG DATA</p>
        </div>
      </div>
    </div>
  )
}

export default ProjectRecom;
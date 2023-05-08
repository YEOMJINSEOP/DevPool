import { useState } from 'react';
import styles from './RecruitField.module.css';

type CurrentField = {
  [key: string]: boolean;
}

function RecruitField() {

  const [selectedTechStack, setSelectedTechStack] = useState<CurrentField>({
    'Front-end': false,
    'Back-end': false,
    'Android': false,
    'iOS': false,
    'AI': false
  });

  const handleCSSToggle = (stack: string):string => {
    return selectedTechStack[stack] ? styles.recruitFieldIcon_selected : styles.recruitFieldIcon;
  }

  return (
    <div className={styles.recruitFieldList}>
            <div className={styles.recruitField}>
              <img className={handleCSSToggle('Front-end')} src="/image/javaScript.png" alt="Front-end" onClick={handleSelectedTechStack} />
              <p>Front-end</p>
            </div>
            <div className={styles.recruitField}>
              <img className={handleCSSToggle('Back-end')}src="/image/server.png" alt="Back-end" onClick={handleSelectedTechStack} />
              <p>Back-end</p>
            </div>
            <div className={styles.recruitField}>
              <img className={handleCSSToggle('Android')}src="/image/android.png" alt="Android" onClick={handleSelectedTechStack}/>
              <p>Android</p>
            </div>
            <div className={styles.recruitField}>
              <img className={handleCSSToggle('iOS')}src="/image/apple-logo.png" alt="iOS" onClick={handleSelectedTechStack}/>
              <p>iOS</p>
            </div>
            <div className={styles.recruitField}>
            <img className={handleCSSToggle('AI')}src="/image/deep-learning.png" alt="AI" onClick={handleSelectedTechStack}/>
              <p>AI</p>
            </div>
    </div>
  );
}

export default RecruitField;
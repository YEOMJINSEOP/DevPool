import axios from 'axios';
import { useEffect, useState } from 'react';
import TeamBlock from '../TeamBlock/TeamBlock';
import { useNavigate } from 'react-router-dom';
import styles from './TeamList.module.css';

type TechStack = {
  name: string;
}

type recruitField = {
  name: string;
}

type recruitStack = {
  name: string;
}

type category = {
  name: string;
}

type Team = {
  teamId: number;
  name: string;
  category: category;
  currentCount: number;
  recruitCount: number;
  recruitField: recruitField[];
  recruitStack: recruitStack[];
  content: string
};

function TeamList(){
  const navigate = useNavigate();
  const [teamList, setTeamList] = useState<Team[]>([]);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/teams`)
    .then((res) => {
      setTeamList(res.data.dataList);
      console.log(res);
    })
    .catch((err) => console.log('get teamList failed', err))
  }, []);

  return (
    <div className={styles.teamListContainer}>
      {/* <div className={styles.recruitFieldList}>
            <div className={styles.recruitField}>
              <img className={styles.recruitFieldIcon}src="/image/javaScript.png" alt="" />
              <p>Front-end</p>
            </div>
            <div className={styles.recruitField}>
              <img className={styles.recruitFieldIcon}src="/image/server.png" alt="" />
              <p>Back-end</p>
            </div>
            <div className={styles.recruitField}>
              <img className={styles.recruitFieldIcon}src="/image/android.png" alt="" />
              <p>Android</p>
            </div>
            <div className={styles.recruitField}>
              <img className={styles.recruitFieldIcon}src="/image/apple-logo.png" alt="" />
              <p>iOS</p>
            </div>
            <div className={styles.recruitField}>
            <img className={styles.recruitFieldIcon}src="/image/deep-learning.png" alt="" />
              <p>AI</p>
            </div>
      </div> */}
      <div>
        <ul className={styles.teamList}>
          {teamList.map((team) => {
            return(
              <li key={team.name}>
                <TeamBlock {...team}/>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default TeamList;
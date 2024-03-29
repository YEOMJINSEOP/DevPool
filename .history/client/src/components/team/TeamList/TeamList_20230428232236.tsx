import axios from 'axios';
import { useEffect, useState } from 'react';
import TeamBlock from '../TeamBlock/TeamBlock';
import { useNavigate } from 'react-router-dom';
import styles from './TeamList.module.css';

type Team = {
  teamId: number;
  name: string;
  category: string;
  currentCount: number;
  recruitCount: number;
  recruitDomain: string;
  recruitStack: string[];
};

function TeamList(){
  const navigate = useNavigate();
  const [teamList, setTeamList] = useState<Team[]>([ {
    "teamId": 1,
    "name": "team name",
    "category": "Web",
    "currentCount": 3,
    "recruitCount": 5,
    "recruitDomain": "Front-end",
    "recruitStack": ["React", "TypeScript"]
}, 
{
    "teamId": 2,
    "name": "team name2",
    "category": "Web",
    "currentCount": 1,
    "recruitCount": 2,
    "recruitDomain": "Back-end",
    "recruitStack": ["Node.js", "Spring"]
}]);

  useEffect(() => {
    // ✅ team 데이터를 모두 get 하는 API 필요
    axios.get(`${process.env.REACT_APP_API_URL}/teamList`)
    .then((res) => {
      setTeamList(res.data);
      console.log(res);
    })
    .catch((err) => console.log('get teamList failed', err))
  }, []);


  return (
    <div className={styles.teamList}>
      <div className={styles.recruitFieldList}>
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
          </div>
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
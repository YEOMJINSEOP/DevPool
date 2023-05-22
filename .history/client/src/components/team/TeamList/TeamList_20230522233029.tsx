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

type Category = {
  name: string;
}


type Team = {
  teamId: number;
  name: string;
  category: Category;
  currentCount: number;
  recruitCount: number;
  createTime: string;
  recruitField: recruitField[];
  recruitStack: recruitStack[];
  content: string;
  hostMember: {
    memberId: number,
    email: string,
    imageUrl: string,
    name: string
  }
};

function TeamList(){
  const navigate = useNavigate();
  const [teamList, setTeamList] = useState<Team[]>([]);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/teams`)
    .then((res) => {
      setTeamList(res.data.dataList);
      console.log(res.data.dataList);
    })
    .catch((err) => console.log('get teamList failed', err))
  }, []);

  return (
    <div className={styles.teamListContainer}>
      <div className={styles.recruitFieldList}>
            <div className={styles.recruitField}>
                <span className={styles.recruitFieldIcon} style={{fontSize: "25px", fontWeight: "600"}}>All</span>
                <p>All</p>
            </div>
            <div className={styles.recruitField}>
              <img className={styles.recruitFieldIcon}src="/image/server.png" alt="" />
              <p>Web</p>
            </div>
            <div className={styles.recruitField}>
              <img className={styles.recruitFieldIcon}src="/image/android.png" alt="" />
              <p>App</p>
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
import axios from 'axios';
import { useEffect, useState } from 'react';
import TeamBlock from '../TeamBlock';
import { useNavigate } from 'react-router-dom';
import styles from './TeamList.module.css';

type Team = {
  name: string;
  category: string;
  currentCount: number;
  recruitCount: number;
  recruitDomain: string;
  recruitStack: string[];
};

function TeamList(){
  const navigate = useNavigate();
  const [teamList, setTeamList] = useState<Team[]>([]);

  useEffect(() => {
    // ✅ team 데이터를 모두 get 하는 API 필요
    axios.get(`${process.env.REACT_APP_API_URL}/teamList`)
    .then((res) => {
      setTeamList(res.data);
      console.log(res);
    })
    .catch((err) => console.log('get teamList failed', err))
  }, []);

  const teamCreateHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(`/teamForm`);
  }

  return (
    <div className={styles.teamList}>
      <button onClick={teamCreateHandler}>팀 만들기</button>
      <div>
        <ul>
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
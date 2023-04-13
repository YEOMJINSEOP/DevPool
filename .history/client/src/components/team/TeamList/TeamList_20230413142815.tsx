import axios from 'axios';
import { useEffect, useState } from 'react';
import TeamBlock from '../TeamBlock';

type Team = {
  name: string;
  category: string;
  currentCount: number;
  recruitCount: number;
  recruitDomain: string;
  recruitStack: string[];
};

function TeamList(){
  
  const [teamList, setTeamList] = useState<Team[]>([]);

  useEffect(() => {
    axios.get('data/team.json')
    .then((res) => {
      setTeamList(res.data);
      console.log(res);
    })
    .catch((err) => console.log('get teamList failed', err))
  }, [])

  return (
    <>
      <button>팀 만들기</button>
      <div>
        <ul>
          {teamList.map((team) => {
            return(
              <li key={team.name}>
                <TeamBlock {...team} />
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default TeamList;
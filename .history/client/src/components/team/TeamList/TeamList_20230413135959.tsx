import axios from 'axios';
import { useEffect, useState } from 'react';

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
  })

  return (
    <>
      <ul>
        {teamList.map((team) => {
          return <li key={team.name}>team</li>
        })}
      </ul>
    </>
  )
}

export default TeamList;
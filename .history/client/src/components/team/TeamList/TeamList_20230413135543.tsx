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

function TeamInfo(){
  
  const [teamList, setTeamList] = useState<Team[]>([]);

  useEffect(() => {
    axios.get('./public/data/team.json')
    .then((res) => setTeamList(res))
    .catch((err) => console.log('get teamList failed', err))
  })

  return (
    <>
    </>
  )
}

export default TeamInfo;
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
    axios.get(`${process.env.REACT_APP_API_URL}/teamList`)
    .then((res) => setTeamList(res))
    .catch((err) => console.log('get teamList failed', err))
  })

  return (
    <>
    </>
  )
}

export default TeamInfo;
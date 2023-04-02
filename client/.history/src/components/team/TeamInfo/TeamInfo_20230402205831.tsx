import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '../../../recoil/user';

type Team = {
  name: string;
  category: string;
  currentCount: number;
  recruitCount: number;
  recruitDomain: string;
  recruitStack: string[];
};

function TeamInfo(){

  const [team, setTeam] = useState<Team>({
    name: '',
    category: '',
    currentCount: 1,
    recruitCount: 1,
    recruitDomain: '',
    recruitStack: [],
  });

  const getTeamInfo = async () => {
    return;
  }

  return (
    <>
      <div className='name-container'>
        
      </div>
      <div className='category-container'>
      
      </div>
      <div className='current-count-container'>
        
      </div>
      <div className='recruit-count-container'>
        
      </div>
      <div className='recruit-domain-container'>
        
      </div>
      <div className='recruit-stack-container'>
        
        <div className='stack-container'>
          <ul className='stack'>
            {team.recruitStack.map((stack, idx) => (
              <li key={idx}>{stack}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className='content'>
        <textarea name="content" id="content" cols={30} rows={10} maxLength={300}></textarea>
      </div>
      <button type="button">팀 참여하기</button>
    </>
  )
}

export default TeamInfo;
import axios from 'axios';
import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    axios.get('data/team.json').then(
      (res) => {
        console.log(res.data[0]);
        setTeam(res.data[0] as Team);
      })
      .catch(
        console.error
      )
  }, [])

  const [team, setTeam] = useState<Team>({
    name: '',
    category: '',
    currentCount: 1,
    recruitCount: 1,
    recruitDomain: '',
    recruitStack: [],
  });

  const getTeamInfo = async () => {
    console.log(fetch('public/data/team.json'))
    return;
  }

  return (
    <>
      <div className='name-container'>
        <h4>팀 이름</h4>
        <p>{team.name}</p>
      </div>
      <div className='category-container'>
        <p>프로젝트 카테고리</p>
        <p>{team.category}</p>
      </div>
      <div className='current-count-container'>
        <p>현재 인원</p>
        <p>{team.currentCount}</p>
      </div>
      <div className='recruit-count-container'>
        <p>모집 인원</p>
        <p>{team.recruitCount}</p>
      </div>
      <div className='recruit-domain-container'>
        <p>모집 분야</p>
        <p>{team.recruitDomain}</p>
      </div>
      <div className='recruit-stack-container'>
        <p>팀 스택</p>
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
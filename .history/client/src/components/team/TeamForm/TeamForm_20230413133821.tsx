import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '../../../recoil/user';
import axios from 'axios';

type Team = {
  name: string;
  category: string;
  currentCount: number;
  recruitCount: number;
  recruitDomain: string;
  recruitStack: string[];
};

function TeamForm(){

  const user = useRecoilValue(userState);

  const [team, setTeam] = useState<Team>({
    name: '',
    category: '',
    currentCount: 1,
    recruitCount: 1,
    recruitDomain: '',
    recruitStack: [],
  });

  const [newStack, setNewStack] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = event.target;
    console.log(name, value);
    setTeam((prevTeam) => ({
      ...prevTeam,
      [name]: name.includes('Count') ? parseInt(value) : value,
    }));
  };

  const handleStackInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setNewStack(event.target.value);
  };

  const handleAddStack = () => { 
    if(newStack === ''){
      return;
    };
    setTeam((prevTeam) => ({
      ...prevTeam,
      recruitStack: [...prevTeam.recruitStack, newStack],
    }));
    setNewStack('');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAddStack();
    }
  };

  const [contentCharCount, setContentCharCount] = useState<number>(0);
  const handleContentCharCount = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContentCharCount(event.target.value.length);
  }

  const handleSubmit = (): void => {
    axios.post('postURL', team)
    .then(res => {
      console.log(res, 'team post가 완료되었습니다.');
    })
    .catch(err => {
      console.error(err, 'team post에 실패했습니다.' );
    })
    console.log(team);
    return;
  }

  return (
    <form className='team-form' action="/post할URL" method="post">
      <p>{user.name}</p>
      <div className='name-container'>
        <label htmlFor='name'>팀 이름</label>
        <input type="text" name='name' id='name' value={team.name} onChange={handleInputChange} maxLength={20}/>
      </div>
      <div className='category-container'>
        <label htmlFor='category'>프로젝트 카테고리</label>
        <select name='category' id='category' value={team.category} onChange={handleInputChange}>
          <option value="web">Web</option>
          <option value="mobile">Mobile App</option>
        </select>
      </div>
      <div className='current-count-container'>
        <label htmlFor="current-count">현재 인원</label>
        <select name="currentCount" id='current-count' value={team.currentCount} onChange={handleInputChange}>
          <option defaultValue="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <div className='recruit-count-container'>
        <label htmlFor="recruit-count">모집 인원</label>
        <select name="recruitCount" id="recruit-count" value={team.recruitCount} onChange={handleInputChange}>
          <option defaultValue="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="미정">미정</option>
        </select>
      </div>
      <div className='recruit-domain-container'>
        <label htmlFor="recruit-domain">모집 분야</label>
        <select name="recruitDomain" id="recruit-domain" value={team.recruitDomain} onChange={handleInputChange}>
          <option defaultValue="front-end">Front-end</option>
          <option value="back-end">Back-end</option>
          <option value="android">Android</option>
          <option value="ios">IOS</option>
          <option value="ai">AI</option>
        </select>
      </div>
      <div className='recruit-stack-container'>
        <label htmlFor="stack-search">스택 추가</label>
        <input type="text" id='stack-search' value={newStack} onChange={handleStackInputChange} onKeyDown={handleKeyDown}/>
        <button type="button" onClick={handleAddStack}>추가</button>
        <div className='stack-container'>
          <ul className='stack'>
            {team.recruitStack.map((stack, idx) => (
              <li key={idx}>{stack}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className='content'>
        <textarea name="content" id="content" cols={30} rows={10} maxLength={300} onChange={handleContentCharCount}></textarea>
        <p>{contentCharCount} / 300</p>
      </div>
      <button type="button" onClick={handleSubmit}>팀 등록하기</button>
    </form>
  )
}

export default TeamForm;
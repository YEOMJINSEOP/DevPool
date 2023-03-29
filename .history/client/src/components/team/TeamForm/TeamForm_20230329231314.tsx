import React, { useState } from 'react';

type Team = {
  name: string;
  category: string;
  currentCount: number;
  recruitCount: number;
  recruitCategory: string;
  recruitStack: string[];
};

function TeamForm(){

  const [team, setTeam] = useState<Team>({
    name: '',
    category: '',
    currentCount: 1,
    recruitCount: 1,
    recruitCategory: '',
    recruitStack: [],
  });

  const [newStack, setNewStack] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { id, value } = event.target;
    console.log(id, value);
    // setTeam((prevTeam) => ({
    //   ...prevTeam,
    //   [name]: name.includes('Count') ? parseInt(value) : value,
    // }));
  };

  const handleStackInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setNewStack(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAddStack();
    }
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

  return (
    <form className='team_form' action="/post할URL" method="post">
      <div className='name_container'>
        <label htmlFor='name'>팀 이름</label>
        <input type="text" id='name' value={team.name} onChange={handleInputChange}/>
      </div>
      <div className='project_categroy'>
        <label htmlFor="project_category_select">프로젝트 카테고리</label>
        <select name="project_category_select" id="project_category_select" value={team.category} onChange={handleInputChange}>
          <option value="web">Web</option>
          <option value="mobile">Mobile App</option>
        </select>
      </div>
      <div className='current_count'>
        <label htmlFor="current_count_select">현재 인원</label>
        <select name="current_count_select" id="current_count_select" value={team.currentCount} onChange={handleInputChange}>
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <div className='recruit_count'>
        <label htmlFor="recruit_count_select">모집 인원</label>
        <select name="recruit_count_select" id="recruit_count_select" value={team.recruitCount} onChange={handleInputChange}>
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="미정">미정</option>
        </select>
      </div>
      <div className='recruit_category'>
        <label htmlFor="recruit_category_select">모집 분야</label>
        <select name="recruit_category_select" id="recruit_category_select" value={team.recruitCategory} onChange={handleInputChange}>
          <option value="front-end">Front-end</option>
          <option value="back-end">Back-end</option>
          <option value="android">Android</option>
          <option value="ios">IOS</option>
          <option value="ai">AI</option>
        </select>
      </div>
      <div className='recruit_stack'>
        <label htmlFor="stack_search_input">스택 추가</label>
        <input type="text" id='stack_search_input' value={newStack} onChange={handleStackInputChange} onKeyDown={handleKeyDown}/>
        <button type="button" onClick={handleAddStack}>추가</button>
        <div className='stack_container'>
          <ul className='stack_list'>
            {team.recruitStack.map((stack, idx) => (
              <li key={idx}>{stack}</li>
            ))}
          </ul>
        </div>
      </div>
    </form>
  )
}

export default TeamForm;
import React, { useState } from 'react';
import SearchBox from '../../common/SearchBox/SearchBox';

function TeamForm(){

  type Team = {
    name: string;
    category: string;
    currentCount: number;
    recruitCount: number;
    recruitCategory: string;
    recruitStack: string[];
  };

  const [team, setTeam] = useState<Team>({
    name: 'default',
    category: 'default',
    currentCount: 1,
    recruitCount: 1,
    recruitCategory: 'default',
    recruitStack: [],
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setTeam((prevTeam) => ({
      ...prevTeam,
      [name]: name === 'recruitCount' || 'currentCount' ? parseInt(value) : value,
    }));
  };

  return (
    <div className='team_form'>
      <div className='team_name'>
        <label htmlFor='team_name_input'>팀 이름</label>
        <input type="text" id='team_name_input' value={team.name} onChange={handleInputChange}/>
      </div>
      <div className='project_categroy'>
        <label htmlFor="project_category_select">프로젝트 카테고리</label>
        <select name="project_category_select" id="project_category_select" value={team.category} onChange={handleInputChange}>
          <option value="web">Web</option>
          <option value="mobile">Mobile App</option>
        </select>
      </div>
      <div className='current_count'>
        <label htmlFor="current_count_select">모집 인원</label>
        <select name="current_count_select" id="current_count_select" value={team.currentCount} onChange={handleInputChange}>
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="미정">미정</option>
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
        <span>스택 추가</span>
        <SearchBox/>
        <div className='stack'>
          <ul className='stack_list'>
            <li>HTML</li>
            <li>CSS</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default TeamForm;
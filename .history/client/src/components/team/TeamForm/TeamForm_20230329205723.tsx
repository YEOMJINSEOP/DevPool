import React, { useState } from 'react';

function TeamForm(){
  const [teamName, setTeamName] = useState<string>('');
  const [projectCategory, setProjectCategory] = useState<string>('');
  const [recruitCount, setRecruitCount] = useState<number>(0);
  const [recruitCategory, setRecruitCategory] = useState<string>('');
  const [recruitStack, setRecruitStack] = useState<Array<string>>([]);

  const handleTeamName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTeamName(event.target.value);
  }

  const handleProjectCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setProjectCategory(event.target.value);
  }

  const handleRecruitCount = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRecruitCount(parseInt(event.target.value));
  }

  const handleRecruitCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRecruitCategory(event.target.value);
  }

  return (
    <div className='team_form'>
      <div className='team_name'>
        <span>팀 이름</span>
        <input type="text" value={teamName} onChange={handleTeamName}/>
      </div>
      <div className='project_categroy'>
        <label htmlFor="project_category_select">프로젝트 카테고리</label>
        <select name="project_category_select" id="project_category_select" value={projectCategory} onChange={handleProjectCategory}>
          <option value="web">Web</option>
          <option value="mobile">Mobile App</option>
        </select>
      </div>
      <div className='recruit_count'>
        <label htmlFor="recruit_count_select">모집 인원</label>
        <select name="recruit_count_select" id="recruit_count_select" value={recruitCount} onChange={handleRecruitCount}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="미정">미정</option>
        </select>
      </div>
      <div className='recruit_category'>
        <label htmlFor="recruit_category_select">모집 분야</label>
        <select name="recruit_category_select" id="recruit_category_select" value={recruitCategory} onChange={handleRecruitCategory}>
          <option value="front-end">Front-end</option>
          <option value="back-end">Back-end</option>
          <option value="android">Android</option>
          <option value="ios">IOS</option>
          <option value="ai">ai</option>
        </select>
      </div>
      <div className='recruit_stack'>
        <span>모집 기술 스택</span>
        <input type="text"></input>
        <div className='stack'>
          <li>HTML</li>
          <li>CSS</li>
        </div>
      </div>
    </div>
  )
}

export default TeamForm;
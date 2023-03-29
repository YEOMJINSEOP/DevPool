import React from 'react';

type teamFormProps = {
  name: string;
  mark: string;
  optional?: string;
};

function TeamForm({name, mark, optional}: teamFormProps){
  return (
    <div>
      <div>
        <span>팀 이름</span>
        <input type="text" />
      </div>
      <div>
        <label htmlFor="project_category_select">프로젝트 카테고리</label>
        <select name="project_category" id="project_category">
          <option value="web">Web</option>
          <option value="mobile">Mobile App</option>
        </select>
      </div>
      <div>
        <label htmlFor="recruit_count_select">모집 인원</label>
        <select name="recruit_count" id="recruit_count">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="미정">미정</option>
        </select>
      </div>
      <div>
        <label htmlFor="recruit_category_select">모집 분야</label>
        <select name="recruit_category" id="recruit_category">
          <option value="front-end">Front-end</option>
          <option value="back-end">Back-end</option>
          <option value="android">Android</option>
          <option value="ios">IOS</option>
          <option value="ai">ai</option>
        </select>
      </div>
      <div>
        <span>모집 기술 스택</span>
        <input type="text"></input>
        <div>
          <li>HTML</li>
          <li>CSS</li>
        </div>
      </div>
    </div>
  )
}

export default TeamForm;
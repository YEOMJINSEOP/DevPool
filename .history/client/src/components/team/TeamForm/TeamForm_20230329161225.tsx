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
        <label htmlFor="project_category_select">프로젝트 카테고리를 선택하세요</label>
        <select name="project_category" id="category">
          <option value="web">Web</option>
          <option value="mobile">Mobile App</option>
        </select>
      </div>
    </div>
  )
}

export default TeamForm;
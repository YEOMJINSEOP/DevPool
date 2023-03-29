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
        <select name="project_category" id="category">
          <option value="web">Web</option>
          <option value="mobile">Mobile App</option>
        </select>
      </div>
    </div>
  )
}

export default TeamForm;
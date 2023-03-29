import React from 'react';

type teamFormProps = {
  name: string;
  mark: string;
  optional?: string;
};

function TeamForm({name, mark, optional}: teamFormProps){
  return (
    <div>
      <input type="text" />
      Hello, {name} {mark}
      {optional && <p>{optional}</p>}
      <div>
        <button>팀 등록하기</button>
      </div>
    </div>
  )
}

export default TeamForm;
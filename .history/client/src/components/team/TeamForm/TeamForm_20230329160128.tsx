import React from 'react';

type teamFormProps = {
  name: string;
  mark: string;
  optional?: string;
};

function TeamForm({name, mark, optional}: teamFormProps){
  return (
    <div>
      Hello, {name} {mark}
      {optional && <p>{optional}</p>}
      <div>
        <button>Click Me</button>
      </div>
    </div>
  )
}

export default TeamForm;
import React from 'react';

type teamFormProps = {
  name: string;
  mark: string;
  optional?: string;
  onClick: (name: string) => void;
};

function TeamForm({name, mark, optional, onClick}: teamFormProps){
  const handleClick = () => onClick(name);
  return (
    <div>
      Hello, {name} {mark}
      {optional && <p>{optional}</p>}
      <div>
        <button onClick={handleClick}>Click Me</button>
      </div>
    </div>
  )
}

export default TeamForm;
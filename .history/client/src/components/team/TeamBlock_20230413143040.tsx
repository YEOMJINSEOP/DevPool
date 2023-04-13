import React from 'react';

type TeamProps = {
  name: string;
  category: string;
  currentCount: number;
  recruitCount: number;
  recruitDomain: string;
  recruitStack: string[];
};

function TeamBlock(props: TeamProps): JSX.Element{
  return (
    <div>
      <h3>{props.name}</h3>
      <div>
      <span>카테고리</span>
      <span>{props.category}</span>
      <span>모집</span>    
      <span>{props.currentCount}</span>
      {props.recruitCount}
      {props.recruitDomain}
      {props.recruitStack}</div>
    </div>
  );
}

export default TeamBlock;
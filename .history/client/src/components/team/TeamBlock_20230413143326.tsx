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
        <div>
          <span>카테고리</span>
          <span>{props.category}</span>
        </div>
        <div>
          <span>모집</span>    
          <span>{props.recruitDomain}</span>
        </div>
        <div>
          <span>목표인원</span>
          <span>{props.currentCount}명/{props.recruitCount}명</span>
        </div>
      </div>
    </div>
  );
}

export default TeamBlock;
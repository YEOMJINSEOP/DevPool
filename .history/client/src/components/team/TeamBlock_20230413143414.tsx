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
          <p>카테고리</p>
          <p>{props.category}</p>
        </div>
        <div>
          <p>모집</p>    
          <p>{props.recruitDomain}</p>
        </div>
        <div>
          <p>목표인원</p>
          <p>{props.currentCount}명/{props.recruitCount}명</p>
        </div>
      </div>
    </div>
  );
}

export default TeamBlock;
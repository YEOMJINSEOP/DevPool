import React from 'react';
import { useNavigate } from 'react-router-dom';

type TeamProps = {
  name: string;
  category: string;
  currentCount: number;
  recruitCount: number;
  recruitDomain: string;
  recruitStack: string[];
};

function TeamBlock(props: TeamProps): JSX.Element{

  const navigate = useNavigate();
  const teamClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    navigate(`/${props.name}`);
  }
  return (
    <div onClick={teamClickHandler}>
      <h3>{props.name}</h3>
      <div>
        <div>
          <p>카테고리</p>
          <span>{props.category}</span>
        </div>
        <div>
          <p>모집</p>    
          <span>{props.recruitDomain}</span>
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
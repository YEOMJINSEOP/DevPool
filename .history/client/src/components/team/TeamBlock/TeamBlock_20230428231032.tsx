import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './TeamBlock.module.css';

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
    // const navDestination = props.name;
    // event.preventDefault();
    // navigate(`/teamInfo/${navDestination}`);
  };

  return (
    <div className={styles.teamBlock} onClick={teamClickHandler}>
      <p className={styles.teamName}>{props.name}</p>
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
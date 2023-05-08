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
    const navDestination = props.name;
    event.preventDefault();
    navigate(`/teamInfo/${navDestination}`);
  };

  return (
    <div className={styles.teamBlock} onClick={teamClickHandler}>

      <span className={styles.hostImg}></span>
      {/* <img className={styles.hostImg} src="" alt="host" /> */}
      <h2 className={styles.teamName}>{props.name}</h2>

      <div className={styles.divider}></div>
      <div className={styles.container}>
        <p className={styles.label}>카테고리</p>
        <p className={styles.inputReadOnly}>{props.category}</p>
      </div>
      <div className={styles.container}>
        <p className={styles.label}>팀 인원</p>    
        <p className={styles.inputReadOnly}>{props.currentCount}명/{props.recruitCount}명</p>
      </div>
    </div>
  );
}

export default TeamBlock;
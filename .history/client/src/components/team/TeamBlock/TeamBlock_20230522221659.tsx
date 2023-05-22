import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './TeamBlock.module.css';
import Label from '../../common/Label/Label';

type TechStack = {
  name: string;
}

type recruitField = {
  name: string;
}

type recruitStack = {
  name: string;
}


type Category = {
  name: string;
}

type TeamProps = {
  teamId: number;
  name: string;
  category: Category;
  currentCount: number;
  recruitCount: number;
  createTime: string;
  recruitTechField: recruitField[];
  recruitStack: recruitStack[];
  content: string;
  hostMember: {
    memberId: number,
    email: string,
    imageUrl: string,
    name: string
  }
};


function TeamBlock(props: TeamProps): JSX.Element{

  const navigate = useNavigate();
  const teamClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    const navDestination = props.teamId;
    event.preventDefault();
    navigate(`/team/detail/${navDestination}`);
  };

  return (
    <div className={styles.teamBlock} onClick={teamClickHandler}>

      <span className={styles.hostImg}></span>
      {/* <img className={styles.hostImg} src="" alt="host" /> */}
      <h2 className={styles.teamName}>{props.name}</h2>

      <div className={styles.divider}></div>
      <div className={styles.container}>
        <Label content="카테고리"></Label>
        <p className={styles.inputReadOnly}>{props.category.name}</p>
      </div>
      <div className={styles.container}>
        <Label content="팀 인원"></Label>
        <p className={styles.inputReadOnly}>{props.currentCount}명/{props.recruitCount}명</p>
      </div>
    </div>
  );
}

export default TeamBlock;
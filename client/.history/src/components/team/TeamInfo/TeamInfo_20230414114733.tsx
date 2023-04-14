import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './TeamInfo.module.css';

type Team = {
  teamId: number;
  name: string;
  category: string;
  currentCount: number;
  recruitCount: number;
  recruitField: string;
  recruitStack: string[];
};

function TeamInfo(){
  useEffect(() => {
    axios.get('public/data/team.json').then(
      (res) => {
        const teamInfo = res.data[0];
        setTeam(teamInfo as Team);
      })
      .catch(
        console.error
      )
  }, [])

  const [team, setTeam] = useState<Team>({
    teamId: 0,
    name: '',
    category: '',
    currentCount: 1,
    recruitCount: 1,
    recruitField: '',
    recruitStack: [],
  });

  return (
    <div className={styles.teamInfo}>
      <div className={`${styles.container} ${styles.name}`}>
        <p>팀 이름</p>
        <p>{team.name}</p>
      </div>
      <div className={`${styles.container} ${styles.category}`}>
        <p>프로젝트 카테고리</p>
        <p>{team.category}</p>
      </div>
      <div className={`${styles.container} ${styles.currentCount}`}>
        <p>현재 인원</p>
        <p>{team.currentCount}</p>
      </div>
      <div className={`${styles.container} ${styles.recruitCount}`}>
        <p>모집 인원</p>
        <p>{team.recruitCount}</p>
      </div>
      <div className={`${styles.container} ${styles.recruitField}`}>
        <p>모집 분야</p>
        <p>{team.recruitField}</p>
      </div>
      <div className={`${styles.container} ${styles.recruitStack}`}>
        <p>팀 스택</p>
      <div className={`${styles.container} ${styles.stackContainer}`}>
          <ul className='stack'>
            {team.recruitStack.map((stack, idx) => (
              <li key={idx}>{stack}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className='content'>
        <p>모집 글</p>
        <textarea name="content" id="content" cols={30} rows={10} maxLength={300}></textarea>
      </div>
      <button type="button">팀 참여하기</button>
    </div>
  )
}

export default TeamInfo;
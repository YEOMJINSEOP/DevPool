import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './TeamInfo.module.css';
import CommentBox from './CommentBox';

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
    // ✅ teamId에 해당하는 team 데이터를 받아오는 get API 필요
    axios.get('/data/team.json').then(
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
        <p className={styles.title}>팀 이름</p>
        <p>{team.name}</p>
      </div>
      <div className={`${styles.container} ${styles.category}`}>
        <p className={styles.title}>프로젝트 카테고리</p>
        <p>{team.category}</p>
      </div>
      <div className={`${styles.container} ${styles.currentCount}`}>
        <p className={styles.title}>현재 인원</p>
        <p>{team.currentCount}</p>
      </div>
      <div className={`${styles.container} ${styles.recruitCount}`}>
        <p className={styles.title}>모집 인원</p>
        <p>{team.recruitCount}</p>
      </div>
      <div className={`${styles.container} ${styles.recruitField}`}>
        <p className={styles.title}>모집 분야</p>
        <p>{team.recruitField}</p>
      </div>
      <div className={`${styles.container} ${styles.recruitStack}`}>
        <p className={styles.title}>팀 스택</p>
        <div className={styles.stack}>
            <ul>
              {team.recruitStack.map((stack, idx) => (
                <li key={idx}>{stack}</li>
              ))}
            </ul>
        </div>
      </div>
      <div className={`${styles.container} ${styles.content}`}>
        <p className={styles.title}>모집 글</p>
        <textarea name="content" id="content" cols={30} rows={10} maxLength={300}></textarea>
      </div>
      <button type="button">팀 참여하기</button>
      <CommentBox teamId={team.teamId}/>
    </div>
  )
}

export default TeamInfo;
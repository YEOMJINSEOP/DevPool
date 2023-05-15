import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './TeamInfo.module.css';
import CommentBox from './CommentBox';
import Label from '../../common/Label/Label';
import { useLocation, useParams } from 'react-router-dom';

type category = {
  name: string;
}
type Team = {
  teamId: number;
  name: string;
  category: string;
  currentCount: number;
  recruitCount: number;
  createTime: string;
  recruitField: string[];
  recruitStack: string[];
  content: string;
  hostMember: {
    memberId: number,
    email: string,
    imageUrl: string,
    name: string
  }
};

function TeamInfo(){
  const params = useParams();
  useEffect(() => {
    // ✅ teamId에 해당하는 team 데이터를 받아오는 get API 필요
    axios.get(`${process.env.REACT_APP_API_URL}/api/team/${params.teamId}`).then(
      (res) => {
        const teamInfo = res.data;
        setTeam(teamInfo);
        console.log(teamInfo);        
      })
      .catch(
        console.error
      )
  }, [])

  const [team, setTeam] = useState<Team>({
    teamId: 3,
    name: '',
    category: '',
    currentCount: 1,
    recruitCount: 1,
    createTime: '',
    recruitField: [],
    recruitStack: [],
    content: '',
    hostMember: {
      memberId: 1,
      email: '',
      imageUrl: '',
      name: ''
    }
  });

  return (
    <>
      <div className={styles.teamInfoContainer}>
        <div className={styles.teamInfo}>
        <div className={`${styles.container} ${styles.header}`}>
          <span className={styles.hostImg}></span>
          <Label content={"팀 이름"}></Label>
          <p className={`${styles.inputReadOnly} ${styles.teamName}`}>{team.teamId}</p>
        </div>
        <div className={`${styles.container} ${styles.categoryAndCount}`}>
          <div className={`${styles.container} ${styles.category}`}>
            <Label content={"카테고리"}></Label>
            <p className={styles.inputReadOnly}>{team.category}</p>
          </div>
          <div className={`${styles.container} ${styles.currentCount}`}>
            <Label content={"팀 인원"}></Label>
            <p className={styles.inputReadOnly}>{team.currentCount} / {team.recruitCount}</p>
          </div>
        </div>
        <div className={`${styles.container} ${styles.recruitField}`}>
          <Label content={"모집 분야"}></Label>
          <p className={styles.inputReadOnly}>{team.recruitField}</p>
        </div>
        <div className={`${styles.container} ${styles.recruitStack}`}>
          <Label content={"모집 스택"}></Label>
          <div className={styles.currentStack}>
              <ul>
                {team.recruitStack && team.recruitStack.map((stack, idx) => (
                  <li className={styles.stack} key={idx}><span>{stack}</span></li>
                ))}
              </ul>
          </div>
        </div>
        <div className={`${styles.container} ${styles.content}`}>
           <Label content="팀 소개"></Label>        
            <textarea className={styles.textareaReadOnly} name="content" id="content" cols={30} rows={10} maxLength={300} readOnly></textarea>
        </div>
        <button className={styles.joinBtn}type="button">팀 참여하기</button>
      </div>
    </div>
    <CommentBox teamId={team.teamId}/>
  </>
  )
}

export default TeamInfo;
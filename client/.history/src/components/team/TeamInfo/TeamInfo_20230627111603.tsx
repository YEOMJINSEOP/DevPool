import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './TeamInfo.module.css';
import CommentBox from './CommentBox';
import Label from '../../common/Label/Label';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isLoggedIn, userState } from '../../../recoil/user';
import { getMemberId } from '../../user/UserInfo/LogIn/LogIn';

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

type Team = {
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

type Member = {
  memberId: number,
  nickName: string
}

function TeamInfo(){

  const [loggedInUserId, setLoggedInUserId] = useState<string>('');
  const navigate = useNavigate();
  const handleDeleteTeam = () => {
    axios.delete(`${process.env.REACT_APP_API_URL}/api/team/${params.teamId}`);
    navigate('/team/list');
  }

  const [teamMemberList, setTeamMemberList] = useState<Member[]>([]);

  const params = useParams();
  useEffect(() => {
    setLoggedInUserId(getMemberId().memberId);
    // ✅ teamId에 해당하는 team 데이터를 받아오는 get API 필요
    axios.get(`${process.env.REACT_APP_API_URL}/api/team/${params.teamId}`).then(
      (res) => {
        const teamInfo = res.data.data;
        setTeam(teamInfo);
        setTeamMemberList(teamInfo.teamMemberList);
        console.log(teamInfo);        
      })
      .catch(
        console.error
      )
  }, []);

  useEffect(() => {
    console.log('🔥', loggedInUserId);
  }, [loggedInUserId])

  const [team, setTeam] = useState<Team>({
    teamId: 0,
    name: '',
    category: {name: ''},
    currentCount: 0,
    recruitCount: 0,
    createTime: '',
    recruitTechField: [],
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
          {/* <span className={styles.hostImg}></span> */}
          <Label content={"팀 이름"}></Label>
          <p className={`${styles.inputReadOnly} ${styles.teamName}`}>{team.name}</p>
        </div>
        <div className={`${styles.container} ${styles.categoryAndCount}`}>
          <div className={`${styles.container} ${styles.category}`}>
            <Label content={"카테고리"}></Label>
            <p className={styles.inputReadOnly}>{team.category.name}</p>
          </div>
          <div className={`${styles.container} ${styles.currentCount}`}>
            <Label content={"팀 인원"}></Label>
            <p className={styles.inputReadOnly}>{team.currentCount} / {team.recruitCount}</p>
          </div>
        </div>
        <div className={`${styles.container} ${styles.recruitStack}`}>
          <Label content={"모집 분야"}></Label>
          <div className={styles.currentStack}>
              <ul>
                {team.recruitTechField && team.recruitTechField.map((field, idx) => (
                  <li className={styles.stack} key={idx}><span>{field.name}</span></li>
                ))}
              </ul>
          </div>          
        </div>
        <div className={`${styles.container} ${styles.recruitStack}`}>
          <Label content={"모집 스택"}></Label>
          <div className={styles.currentStack}>
              <ul>
                {team.recruitStack && team.recruitStack.map((stack, idx) => (
                  <li className={styles.stack} key={idx}><span>{stack.name}</span></li>
                ))}
              </ul>
          </div>
        </div>
        <div className={`${styles.container} ${styles.content}`}>
           <Label content="팀 소개"></Label>        
            <textarea className={styles.textareaReadOnly} name="content" id="content" cols={30} rows={10} maxLength={300} value={team.content} readOnly></textarea>
        </div>
        <div className={`${styles.container} ${styles.button}`}>
          <button className={styles.joinBtn} type="button" onClick={() => {
            const participateDate = {
              memberId: loggedInUserId,
              teamId: team.teamId
            }
            console.log('🤴🏻', participateDate);
            axios.post(`http://13.124.112.157/api/member-team/`, {},
             {
              params: {
                memberId: loggedInUserId,
                teamId: team.teamId
              }
             }
            )
             .then(() => alert('팀에 참여했습니다!'))
             .catch(() => alert('이미 팀에 참여했거나, 모집이 종료되었습니다.'))

          }}>팀 참여하기</button>
          {
            loggedInUserId && loggedInUserId.toString() === team.hostMember.memberId.toString() && 
            <button className={styles.removeBtn} onClick={handleDeleteTeam}>팀 삭제하기</button>
          }
        </div>
      </div>
    </div>
    <div className={styles.teamMemberContainer}>
      <div className={styles.teamMemberStatus}>
        <h3 className={styles.teamMemberTitle}>현재 팀원 리스트</h3>
        <div className={styles.divider}></div>
        <ul className={styles.teamMemberList}>
          {teamMemberList.map((member) => <li>{member.nickName}</li>)}
        </ul>
      </div>      
    </div>
    <CommentBox teamId={team.teamId}/>
  </>
  )
}

export default TeamInfo;
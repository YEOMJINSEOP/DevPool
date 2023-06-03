import { useEffect, useState } from 'react';
import BasicModal from '../BasicModal';
import styles from './UserInfo.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHtml5, faJsSquare, faJava, faCss3Alt, faVuejs, faReact, faAngular, faNode, faApple, faAndroid } from '@fortawesome/free-brands-svg-icons'
import { faMicrochip, faArrowsToEye } from '@fortawesome/free-solid-svg-icons';
import StackTags from '../StackTags';
import StackField from '../StackField';
import TechField from '../../../common/TechField/TechField';
import styled from '@emotion/styled';
import axios from 'axios';
import { getMemberId } from '../LogIn/LogIn';
import { useLocation, useParams } from 'react-router-dom';

export const stackOptions = [
  { id: '1', label: 'HTML', icon: <FontAwesomeIcon className={styles.icon} icon={faHtml5} size="xl" style={{color: "#f77408",}} /> },
  { id: '2', label: 'CSS', icon: <FontAwesomeIcon className={styles.icon} icon={faCss3Alt} size="xl" style={{color: "#104094",}} /> },
  { id: '3', label: 'JavaScript', icon: <FontAwesomeIcon className={styles.icon} icon={faJsSquare} size="xl" style={{color: "#ebee20",}} /> },
  { id: '4', label: 'Vue.js', icon: <FontAwesomeIcon className={styles.icon} icon={faVuejs} size="xl" style={{color: "#4d8217",}} /> },
  { id: '5', label: 'React.js', icon: <FontAwesomeIcon className={styles.icon} icon={faReact} size="xl" style={{color: "#3a8fcf",}} /> },
  { id: '6', label: 'Angular', icon: <FontAwesomeIcon className={styles.icon} icon={faAngular} size="xl" style={{color: "#b91d1b",}} /> },
  { id: '7', label: 'Node.js', icon: <FontAwesomeIcon className={styles.icon} icon={faNode} size="xl" style={{color: "#5fb922",}} /> },
  { id: '8', label: 'Java(Spring)', icon: <FontAwesomeIcon className={styles.icon} icon={faJava} size="xl" style={{color: "#20426f",}} /> },

];

const TechFieldContainer = styled.div`
margin-top: 50px;
`;

export const BASE_URL = process.env.REACT_APP_API_URL;

//나중에 axios로 회원 정보 가져와서 member의 초기 state로 설정할거임. 

export default function UserInfo(Member) {

  const { userId } = useParams();
  const { state } = useLocation();
  const userStack = [];
  state.stack.map((item) => {
    userStack.push(item.name);
  })

  // 관심사 state
  const [selectedInterest, setSelectedInterest] = useState('선택하기');
  // 선택된 스택 state
  const [selectedStack, setSelectedStack] = useState([]);
  // 전체 member의 state
  const [member, setMember] = useState({
    name: '',
    email: '',
    interest: [],
    stack: [],
    project: [],
    certificate: [],
    relatedSite: [],
  });

  // member interest 설정
    useEffect(() => {
      if (selectedInterest == '선택하기') {
        return;
      };
      if (member.interest.indexOf(selectedInterest) != -1) {
        return;
      }
      setMember((prev) => ({
        ...prev,
        interest: [...prev.interest, selectedInterest],
      }));
      setSelectedInterest("선택하기");
    }, [selectedInterest]);

  function handleClick(url) {
  if(url.includes('https://')) window.open(`${url}`);
  else window.open(`https://${url}`);
  }

  return (
  <div className={styles.user}>
    <div className={styles.user_wrapper}>
    <div className={styles.user_box}>
      {/* 유저 박스 왼쪽(이미지) */}
      <div className={styles.userBox_left}>
        <img 
        className={styles.user_img}
        alt='User Img' 
        style={{"width":"150px"}}
        src={state.imageUrl}/>
        {/* <button className={styles.profileBtn}>프로필 변경</button> */}
      </div>
      <div className={styles.user_box_middle}>
        <p>
          <div className={styles.inputLabel}>이름: {state.nickName}</div>
        </p>
        <div className={styles.user_project}>
          <label>관심 분야</label>
        </div>
        <div className={styles.stack_list}>
          {state.techField.map((item) => {
            return (
              <li className={styles.stack_item}>{item.name}</li>
            );
          })}
        </div>
      </div>
      <div className='user_box_right'>
        <button className={styles.message_btn}>쪽지 보내기</button>
      </div>
    </div>
    <div className={styles.user_stack_wrapper}>
      <label htmlFor='stack'>기술 스택</label>
      <StackField
      selectedStack={userStack}
      />
    </div>
    {/* 프로젝트 */}
      <div className={styles.user_project}>
        <label htmlFor='project'>프로젝트 경험</label>
      </div>
      <div className={styles.project_wrapper}>
      {state.project.map((item, idx) => {
          let userProjectStack = [];
          item.stack.map((current) => {
            userProjectStack.push(current.name);
          });
        return (
        <li id={"project " + item.id}
         key={idx}>
          <span>
          {item.name}
          {idx+1}.
          </span>
          {stackOptions.filter(option => 
            userProjectStack.includes(option.label)
          ).map((option, index) => (
            <span key={index} className={styles.project_stack_icon}>{option.icon}</span>)
          )}
          <span className={styles.project_span}>
          {item.startDate} ~ {item.endDate}
          </span>
        </li>
        )
      })}
    </div>
    {/* 자격증 */}
    <div className={styles.user_certificate}>
      <label htmlFor='certificate'>자격증</label>
    </div>
    <div className={styles.certificate_wrapper}>
      {state.certificate.map((item, idx) => {
        return (
          <li
          className={styles.certificate_list}
          id={"certificate " + item.id}
          key={"certificate" + idx}>
            {idx+1}. {item.name}
          </li>
        );
      })}
    </div>
      <div className={styles.user_relatedSite}>
        <label htmlFor='relatedSited'>관련 사이트</label>
      </div>
        <div className={styles.relatedSite_wrapper}>
        {state.site.map((item, idx) => {
          return (
            <li 
            className={styles.certificate_list}
            id={"relatedSite " + item.id}
            key={"relatedSite" + idx}
            onClick={()=>handleClick(item.name)}>
              {idx+1}. {item.name}
            </li>
          );
        })}
      </div>
    </div>
  </div>
  )
}
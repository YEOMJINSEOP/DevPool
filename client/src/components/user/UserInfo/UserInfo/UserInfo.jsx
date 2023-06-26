import { useEffect, useState } from 'react';
import styles from './UserInfo.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHtml5, faJsSquare, faJava, faCss3Alt, faVuejs, faReact, faAngular, faNode, faApple, faAndroid } from '@fortawesome/free-brands-svg-icons'
import StackField from '../StackField';
import styled from '@emotion/styled';
import { useLocation, useParams } from 'react-router-dom';
import MessageModal from './MessageModal';

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
        style={{"width":"150px", height: "150px"}}
        src={state.imageUrl}/>
        {/* <button className={styles.profileBtn}>프로필 변경</button> */}
      </div>
      <div className={styles.user_box_middle}>
        <p>
          <div className={styles.nameLabel}>
            <label style={{marginRight: "20px"}}>이름</label>
            <span style={{boxShadow: "0 0 3px rgba(0, 0, 0, 0.3)", padding: "4px", borderRadius: "6px"}}>{state.nickName}</span>
          </div>
        </p>
        <div className={styles.user_project}>
          <label>관심 분야</label>
        </div>
        <div className={state.techField.length == 0 ? 'stack_list' : 'stack_exist'}>
          {state.techField.map((item) => {
            return (
              <li className={styles.stack_item}>{item.name}</li>
            );
          })}
        </div>
      </div>
      <div className='user_box_right'>
        <MessageModal receiverId={userId}/>
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
      <div className={state.project.length === 0 ? 'project_wrapper' : 'project_exist'}>
      {state.project.map((item, idx) => {
          let userProjectStack = [];
          item.stack.map((current) => {
            userProjectStack.push(current.name);
          });
        return (
        <li id={"project " + item.id}
         className={styles.project_list}
         key={idx}>
          <span>
          {idx+1}. 
          {item.name}
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
    <div className={state.certificate.length === 0 ? 'certificate_wrapper' : 'exist'}>
      {state.certificate.map((item, idx) => {
        return (
          <li
          className={styles.certificate_list}
          id={"certificate " + item.id}
          key={"certificate" + idx}>
            {item.name}
          </li>
        );
      })}
    </div>
      <div className={styles.user_relatedSite}>
        <label htmlFor='relatedSited'>관련 사이트</label>
      </div>
        <div className={state.site.length === 0 ? 'relatedSite_wrapper' : 'exist'}>
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
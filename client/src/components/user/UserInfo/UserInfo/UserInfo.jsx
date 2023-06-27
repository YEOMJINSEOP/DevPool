import { useEffect, useState } from 'react';
import styles from './UserInfo.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHtml5, faJsSquare, faJava, faCss3Alt, faVuejs, faReact, faAngular, faNode, faApple, faAndroid } from '@fortawesome/free-brands-svg-icons'
import { faMicrochip, faArrowsToEye } from '@fortawesome/free-solid-svg-icons';
import StackField from '../StackField';
import styled from '@emotion/styled';
import { useLocation, useParams } from 'react-router-dom';
import MessageModal from './MessageModal';
import axios from 'axios';

export const stackOptions = [
  { id: '1', label: 'HTML', icon: <FontAwesomeIcon className={styles.icon} icon={faHtml5} size="xl" style={{color: "#f77408",}} /> },
  { id: '2', label: 'CSS', icon: <FontAwesomeIcon className={styles.icon} icon={faCss3Alt} size="xl" style={{color: "#104094",}} /> },
  { id: '3', label: 'JavaScript', icon: <FontAwesomeIcon className={styles.icon} icon={faJsSquare} size="xl" style={{color: "#ebee20",}} /> },
  { id: '4', label: 'Vue.js', icon: <FontAwesomeIcon className={styles.icon} icon={faVuejs} size="xl" style={{color: "#4d8217",}} /> },
  { id: '5', label: 'React.js', icon: <FontAwesomeIcon className={styles.icon} icon={faReact} size="xl" style={{color: "#3a8fcf",}} /> },
  { id: '6', label: 'Angular', icon: <FontAwesomeIcon className={styles.icon} icon={faAngular} size="xl" style={{color: "#b91d1b",}} /> },
  { id: '7', label: 'Node.js', icon: <FontAwesomeIcon className={styles.icon} icon={faNode} size="xl" style={{color: "#5fb922",}} /> },
  { id: '8', label: 'Java(Spring)', icon: <FontAwesomeIcon className={styles.icon} icon={faJava} size="xl" style={{color: "#20426f",}} /> },
  { id: '9', label: 'Deep learning(AI)', icon: <FontAwesomeIcon className={styles.icon} icon={faMicrochip} size="xl" style={{color: "#235ab8",}} /> },
  { id: '10', label: 'Computer Vision(AI)', icon: <FontAwesomeIcon className={styles.icon} icon={faArrowsToEye} size="xl" style={{color: "#298b9e",}} /> },
  { id: '11', label: 'IOS', icon: <FontAwesomeIcon className={styles.icon} icon={faApple} size="xl" style={{color: "#0d0d0d",}} /> },
  { id: '12', label: 'Android', icon: <FontAwesomeIcon className={styles.icon} icon={faAndroid} size="xl" style={{color: "#5fb922",}} /> },
];

const TechFieldContainer = styled.div`
margin-top: 50px;
`;

export const BASE_URL = process.env.REACT_APP_API_URL;

//나중에 axios로 회원 정보 가져와서 member의 초기 state로 설정할거임. 

export default function UserInfo(Member) {
  const stackOptions = [
    { id: '1', label: 'HTML', icon: <FontAwesomeIcon className={styles.icon} icon={faHtml5} size="xl" style={{color: "#f77408",}} /> },
    { id: '2', label: 'CSS', icon: <FontAwesomeIcon className={styles.icon} icon={faCss3Alt} size="xl" style={{color: "#104094",}} /> },
    { id: '3', label: 'JavaScript', icon: <FontAwesomeIcon className={styles.icon} icon={faJsSquare} size="xl" style={{color: "#ebee20",}} /> },
    { id: '4', label: 'Vue.js', icon: <FontAwesomeIcon className={styles.icon} icon={faVuejs} size="xl" style={{color: "#4d8217",}} /> },
    { id: '5', label: 'React.js', icon: <FontAwesomeIcon className={styles.icon} icon={faReact} size="xl" style={{color: "#3a8fcf",}} /> },
    { id: '6', label: 'Angular', icon: <FontAwesomeIcon className={styles.icon} icon={faAngular} size="xl" style={{color: "#b91d1b",}} /> },
    { id: '7', label: 'Node.js', icon: <FontAwesomeIcon className={styles.icon} icon={faNode} size="xl" style={{color: "#5fb922",}} /> },
    { id: '8', label: 'Java(Spring)', icon: <FontAwesomeIcon className={styles.icon} icon={faJava} size="xl" style={{color: "#20426f",}} /> },
  ];

  const { state } = useLocation();

  const [userInfo, setUserInfo] = useState();
  const [userStack, setUserStack] = useState([]);
  const { userId } = useParams();

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
  
  useEffect(()=> {
    axios.get(`${BASE_URL}/api/member-pool/${userId}`)
    .then((res) => {
      console.log(res.data.data);
      setUserInfo(res.data.data);

      const tmpStack = [];
      res.data.data.stack.map((item) => {
        tmpStack.push(item.name);
      });

      setUserStack(tmpStack);
    })
  }, [])

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
    {userInfo && 
        <div className={styles.user_wrapper}>
        <div className={styles.user_box}>
          {/* 유저 박스 왼쪽(이미지) */}
          <div className={styles.userBox_left}>
            <img 
            className={styles.user_img}
            alt='User Img' 
            style={{"width":"150px", height: "150px"}}
            src={userInfo.imageUrl}/>
            {/* <button className={styles.profileBtn}>프로필 변경</button> */}
          </div>
          <div className={styles.user_box_middle}>
            <p>
              <div className={styles.nameLabel}>
                <label style={{marginRight: "20px"}}>이름</label>
                <span style={{boxShadow: "0 0 3px rgba(0, 0, 0, 0.3)", padding: "4px", borderRadius: "6px"}}>{userInfo.nickName}</span>
              </div>
            </p>
            <div className={styles.user_project}>
              <label>관심 분야</label>
            </div>
            <div className={userInfo.techField.length == 0 ? 'stack_list' : 'stack_exist'}>
              {userInfo.techField.map((item) => {
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
          {userStack && <StackField
          selectedStack={userStack}
          />}
        </div>
        {/* 프로젝트 */}
          <div className={styles.user_project}>
            <label htmlFor='project'>프로젝트 경험</label>
          </div>
          <div className={userInfo.project.length === 0 ? 'project_wrapper' : 'project_exist'}>
          {userInfo.project.map((item, idx) => {
              let userProjectStack = [];
              item.stack.map((current) => {
                userProjectStack.push(current.name);
              });
            return (
            <li id={"project " + item.id}
             className={styles.project_list}
             key={idx}
             style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: "57px"}}
             >
              <div>
              {item.name}
              </div>
              {stackOptions.filter(option => 
                userProjectStack.includes(option.label)
              ).map((option, index) => (
                <div key={index} className={styles.project_stack_icon}>{option.icon}</div>)
              )}
              <div className={styles.project_span}>
              {item.startDate} ~ {item.endDate}
              </div>
            </li>
            )
          })}
        </div>
        {/* 자격증 */}
        <div className={styles.user_certificate}>
          <label htmlFor='certificate'>자격증</label>
        </div>
        <div className={userInfo.certificate.length === 0 ? 'certificate_wrapper' : 'exist'}>
          {userInfo.certificate.map((item, idx) => {
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
            <div className={userInfo.site.length === 0 ? 'relatedSite_wrapper' : 'exist'}>
            {userInfo.site.map((item, idx) => {
              return (
                <li 
                className={styles.certificate_list}
                id={"relatedSite " + item.id}
                key={"relatedSite" + idx}
                onClick={()=>handleClick(item.name)}>
                  {item.name}
                </li>
              );
            })}
          </div>
        </div>
    }
  </div>
  )
}
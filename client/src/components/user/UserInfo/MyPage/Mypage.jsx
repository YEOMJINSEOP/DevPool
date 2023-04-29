import { useEffect, useState } from 'react';
import BasicModal from '../BasicModal';
import Tags from '../StackTags';
import styles from './MyPage.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHtml5, faJsSquare, faJava, faCss3Alt, faVuejs, faReact, faAngular, faNode, faApple, faAndroid } from '@fortawesome/free-brands-svg-icons'
import { faMicrochip, faArrowsToEye } from '@fortawesome/free-solid-svg-icons';

const interestList = ["선택하기", "Front-end", "Back-end", "IOS",  "Android", "AI"];

//나중에 axios로 회원 정보 가져와서 member의 초기 state로 설정할거임. 

export default function UserInfo(Member) {
  // certificate 입력값
  const [certificate, setCertificate] = useState('');
  const [certificateId, setCertificateId] = useState(1);
  // 관심사 state
  const [selectedInterest, setSelectedInterest] = useState('선택하기');
  // 선택된 스택 state
  const [selectedStack, setSelectedStack] = useState([]);
  const [selectedStackIcons, setSelectedStackIcons] = useState([]);
  // Project state
  const [project, setProject] = useState('');
  const [projectId, setProjectId] = useState(1);
  const [projectStart, setProjectStart] = useState('');
  const [projectEnd, setProjectEnd] = useState('');
  const [projectStack, setProjectStack] = useState([]);
  const [ProjectStackIcons, setProjectStackIcons] = useState([]);
  // 전체 member의 state
  const [member, setMember] = useState({
    name: '',
    email: '',
    interest: [],
    stack: [],
    project: [],
    certificate: [],
  });

  const stackOptions = [
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

    useEffect(() => {
      let projectIcons = member.project.map(now => stackOptions.filter(option => now.stack.includes(option.label)));
      setProjectStackIcons(projectIcons);
    }, [member.project]);

    // 멤버 stack 설정
    useEffect(() => {
      setMember((prev) => ({
        ...prev,
        stack: selectedStack,
      }));
      // 스택의 Icon을 filter해서 보여줌
      setSelectedStackIcons(stackOptions.filter(option => selectedStack.includes(option.label)));
    }, [selectedStack]);

  // 리스트에 추가하기
  const handleAddBtn = (e) => {
    const { id, value } = e.target;
    // 관심사를 추가한다면 selectedInterest 바꿈. useEffect로 연결되어 있어 member에 저장함. 
    if(id == 'interest') {
      setSelectedInterest(value);
    }
    // 자격증 추가할 때
    else if(id == 'certificate') {
      if(certificate == '') return;
      if(member.certificate.filter((item) => item == certificate).length != 0) {
        alert('중복되는 자격증이 있습니다.');
        setCertificate('');
        return;
      }
      setMember((prev) => {
        const newCertificate = [...prev.certificate];
        newCertificate.push({
          id: certificateId,
          content: certificate
        });
        return {
          ...prev,
          certificate: newCertificate,
        };
      });
      setCertificate('');
      setCertificateId(count => count + 1);
    }
    // 프로젝트 추가할 때
    else if(id == 'project') {
      if(project == '') return;
      if(member.project.filter((item) => item == project.content).length != 0) {
        alert('중복되는 프로젝트 있습니다.');
        setProject('');
        return;
      }
      setMember((prev) => {
        const newProject = [...prev.project];
        const newProjectStack = projectStack;
        newProject.push({
          id: projectId,
          content: project,
          start: projectStart,
          end: projectEnd,
          stack: newProjectStack
        });
        return {
          ...prev,
          project: newProject,
        };
      });
      setProject('');
      setProjectStart('');
      setProjectEnd('');
      setProjectId(count => count + 1);
      setProjectStack([]);
    }
  }

  // 리스트 삭제하기(parentId는 "항목 내용"의 형태로 되어 있음. )
  const handleDeleteBtn = (e) => {
    const parentId = e.target.parentNode.id.split(' ');
    console.log(parentId);
    setMember((prev) => {
      let current = {...prev};
      current[parentId[0]] = current[parentId[0]].filter((item) => parentId[1] !== item);
      return current
    });
  }

  // 자격증 삭제하기 (일단 자격증만 id로 구현해 놓음.)
  const handleDeleteBtn2 = (e) => {
    const parentId = e.target.parentNode.id.split(' ');
    if(parentId[0] == 'certificate') {
      setMember((prev) => {
        let newCertificate = [...prev.certificate]; 
        newCertificate = newCertificate.filter((item)=> item.id != parentId[1]);
        return {
          ...prev,
          certificate: newCertificate,
        };
      });
    }
    else if(parentId[0] == 'project') {
      setMember((prev) => {
        let newProject = [...prev.project];
        newProject = newProject.filter((item)=> item.id != parentId[1]);
        return {
          ...prev,
          project: newProject,
        };
      });
    }
  }

  const handleUserInput =  (e) => {
    const { id, value } = e.target;
    setMember((prev) => {
      const cur = {...prev};
      cur[id] = value;
      return cur
    })
  }

  const handleMember = () => {
    console.log(member);
  }

  const handleProject = (e) => {setProject(e.target.value)};
  const handleProjectStart = (e) => setProjectStart(e.target.value);
  const handleProjectEnd = (e) => setProjectEnd(e.target.value);
  const handleSelectedStack = (event, values) => {
    setSelectedStack(values);
    console.log(values);
  };
  const handleProjectStack = (event, values) => {
    let newValues= [];
    values.map((value) => {
      newValues.push(value.label);
    });
    setProjectStack(newValues);
  };

  return (
  <div className={styles.user_wrapper}>
    <div className={styles.user_box}>
      {/* 유저 박스 왼쪽(이미지) */}
      <div className={styles.userBox_left}>
        <img 
        className='user_img'
        alt='User Img' 
        style={{"width":"150px"}}
        src='https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzAyMDFfMTI5%2FMDAxNjc1MjI5OTcyMzkx.BhdakINlrZwH50XjsGZy2q6mvbMNC68YKvx7HjkbQ9Yg.i6rCMpvj2Z5trsoKkmNy-SKv91NJir4g4DPa_NbHAKcg.PNG.soki17%2Fimage.png&type=a340'/>
        <button className={styles.profileBtn}>프로필 변경</button>
      </div>
      <div className='user_box_middel'>
        <p>
          이름 :<input 
          className={styles.name_input}
          id='name'
          name='name'
          placeholder='이름' 
          type="text" value={member.name} 
          onChange={handleUserInput}/>
        </p>
        <div className={styles.interest_wrapper}>
          <label htmlFor='interest'>관심분야</label>
          <select id="interest" value={selectedInterest} onChange={handleAddBtn} className={styles.interest_input}>
            {interestList.map((item, idx) => {
              return (
                <option 
                className={styles.interest_option}
                value={item}
                key={idx}>{item}</option>
              );
            })}
          </select>
          {member.interest.map((item, idx) => {
            return (
              <li 
              className={styles.interest_list}
              id={"interest " + item}
              key={idx}>
                {item}
                <button onClick={handleDeleteBtn} className={styles.interest_deleteBtn}>삭제</button>
              </li>
            );
          })}
        </div>
      </div>
      {/* 유저 박스 오른쪽(이메일, 이름, 관심분야) 관심분야(추가, 삭제 완료) */}
      <div className='user_box_right'>
        <button className={styles.message_btn}>쪽지 보내기</button>
      </div>
    </div>
    <div className={styles.user_stack_wrapper}>
      <label htmlFor='stack'>기술 스택</label>
      <Tags 
      selectedStack={selectedStack}
      handleSelectedStack={handleSelectedStack}
      />
      <div className={styles.user_stack}>
        {selectedStackIcons && selectedStackIcons.map((items) => {
          return (
            <div>{items.icon}</div>
          )
        })}
      </div>
    </div>
    {/* 프로젝트 */}
    <div className={styles.user_project}>
      <label htmlFor='project'>프로젝트 경험</label>
      <BasicModal 
      className={styles.project_modal}
      project={project}
      handleProject={handleProject}
      projectStack={projectStack}
      handleProjectStack={handleProjectStack}
      projectStart={projectStart}
      handleProjectStart={handleProjectStart}
      projectEnd={projectEnd}
      handleProjectEnd={handleProjectEnd}
      handleAddBtn={handleAddBtn}/>
      {member.project.map((item, idx) => {
        return (
        <li id={"project " + item.id}
         key={idx}>
          <span>
          {item.content} 
          </span>
          {stackOptions.filter(option => item.stack.includes(option.label)).map((option, index) => (
            <span key={index} className={styles.project_stack_icon}>{option.icon}</span>)
          )}
          <span className={styles.project_span}>
          {item.start} ~ {item.end}
          </span>
          <button onClick={handleDeleteBtn2} className={styles.project_deleteBtn}>삭제</button>
        </li>
        )
      })}
    </div>
    {/* 자격증 */}
    <div className={styles.user_certificate}>
      <label htmlFor='certificate'>자격증</label>
        <input 
        className={styles.certificate_input}
        placeholder='' 
        type="text" 
        value={certificate}
        onChange={(event)=>setCertificate(event.target.value)}/>
        <button id="certificate" onClick={handleAddBtn} className={styles.certificateBtn}>추가하기</button>
    </div>
    {member.certificate.map((item, idx) => {
      return (
        <li 
        className={styles.certificate_list}
        id={"certificate " + item.id}
        key={"certificate" + idx}>
          {item.content}
          <button onClick={handleDeleteBtn2} className={styles.certificate_deleteBtn}>삭제</button>
        </li>
      );
    })}
    <button onClick={handleMember} className={styles.submitBtn}>제출하기</button>
  </div>
  )
}
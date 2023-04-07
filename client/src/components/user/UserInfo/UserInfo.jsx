import React, { useEffect, useState } from 'react';
import { getMemberInfo } from '../../../api/api';
import Autocomplete from './Autocomplete';  

const Member = {
  name: '',
  email: '',
  interest: [],
  stack: [],
  project: [],
  certificate: [],
}

const interestList = ["선택하기", "Front-end", "Back-end", "Mobile", "AI"];

export default function UserInfo() {
  const [stackInput, setStackInput] = useState('');
  const [projectSearch, setProjectSearch] = useState('');
  const [experience, setExperience] = useState('');
  const [certificate, setCertificate] = useState('');
  const [selectedInterest, setSelectedInterest] = useState('선택하기');
  const [selectedStack, setSelectedStack] = useState('');
  const [member, setMember] = useState({
    name: '',
    email: '',
    interest: [],
    stack: [],
    project: [],
    certificate: [],
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

    useEffect(() => {
      if (selectedStack=='' || selectedStack==undefined) return;
      if (member.stack.indexOf(selectedStack) != -1) {
        alert('이미 선택된 항목입니다.');
        setStackInput('');
        setSelectedStack('');
        return;
      }
      console.log('HI');
      setMember((prev) => ({
        ...prev,
        stack: [...prev.stack, selectedStack],
      }));
      setStackInput('');
      setSelectedStack('');
    }, [selectedStack]);

  // 리스트에 추가하기
  const handleAddBtn = (e) => {
    const { id, value } = e.target;
    // 관심사를 추가한다면 selectedInterest 바꿈. useEffect로 연결되어 있어 member에 저장함. 
    if(id == 'interest') {
      setSelectedInterest(value);
    }
    else if(id == 'certificate') {
      if(certificate == '') return;
      if(member.certificate.filter((item) => item == certificate).length != 0) {
        alert('중복되는 자격증이 있습니다.');
        setCertificate('');
        return;
      }
      setMember((prev) => ({
        ...prev,
        certificate: [...prev.certificate, certificate],
      }));
      setCertificate('');
    }
  }

  const handleAddStack = (selected) => {
    setSelectedStack(selected);
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

  const handleUserInput =  (e) => {
    const { id, value } = e.target;
    setMember((prev) => {
      const cur = {...prev};
      cur[id] = value;
      return cur
    })
  }

  const handleInputChange = (item) => {
    setStackInput(item);
  };
  // input의 onChange 이벤트 때, 입력값을 inputValue에 저장하고 hasText값 갱신

  const handleMember = () => {
    console.log(member);
  }
  
  return (
  <div className='user'>
    <div className='user_box'>
    {/* 유저 박스 왼쪽(이미지) */}
    <div className="user_box_left">
      <img 
      className='user_img'
      alt='User Img' 
      style={{"width":"150px"}}
      src='https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzAyMDFfMTI5%2FMDAxNjc1MjI5OTcyMzkx.BhdakINlrZwH50XjsGZy2q6mvbMNC68YKvx7HjkbQ9Yg.i6rCMpvj2Z5trsoKkmNy-SKv91NJir4g4DPa_NbHAKcg.PNG.soki17%2Fimage.png&type=a340'/>
      <button className='uer_img_btn' style={{"width":"150px"}}>이미지 등록</button>
    </div>
    {/* 유저 박스 오른쪽(이메일, 이름, 관심분야) 관심분야(추가, 삭제 완료) */}
    <div className='user_box_right'>
      <input 
      id='name'
      placeholder='이름' 
      type="text" value={member.name} 
      onChange={handleUserInput}
      style={{"display":"block"}} />
      <input 
      id='email' 
      placeholder='이메일' 
      type="text" 
      value={member.email} 
      onChange={handleUserInput} />
      <div>
        <label htmlFor='interest'>관심분야</label>
        <select id="interest" value={selectedInterest} onChange={handleAddBtn}>
          {interestList.map((item) => {
            return (
              <option value={item}>{item}</option>
            );
          })}
        </select>
        {member.interest.map((item) => {
          return (
            <li id={"interest " + item}>
              {item}
              <button onClick={handleDeleteBtn}>삭제</button>
            </li>
          );
        })}
      </div>
    </div>
    </div>
    <div className='user_stack'>
      <label htmlFor='stack'>기술 스택</label>
      <Autocomplete  
      stackInput={stackInput} 
      handleInputChange={handleInputChange}
      handleAddStack={handleAddStack}/>
      {member.stack.map((item) => {
        return (
        <div>
          {item}
        </div>
        )
      })}
    </div>
    {/* 프로젝트 */}
    <div className='user_project'>
      <label htmlFor='project'>프로젝트 경험</label>
      <button>추가하기</button>
      <input placeholder='' type="text" value={projectSearch} onChange={(e) => setProjectSearch(e.target.value)} />
    </div>
    {/* 활동 경험 */}
    {experience && experience.map((item) => {
      return (
        <div className='experience_box'>
        <div>{item.project_name}</div>
        {item.project_icon.map((icon) => {
          return (
            <i class={icon} style={{"fontSize": "35px"}}></i>
          );
        })}
        <div>{item.project_start} ~ {item.project_end}</div>
        </div>
      );
    })}
    {/* 자격증 */}
    <div className='user_certificate'>
      <label htmlFor='certificate'>자격증</label>
        <input 
        placeholder='' 
        type="text" 
        value={certificate}
        onChange={(event)=>setCertificate(event.target.value)}/>
        <button id="certificate" onClick={handleMember}>추가하기</button>
    </div>
    {member.certificate.map((item) => {
      return (
        <li id={"certificate " + item}>
          {item}
          <button onClick={handleDeleteBtn}>삭제</button>
        </li>
      );
    })}
  </div>
  )
}

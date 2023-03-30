import React, { useEffect, useState } from 'react';
import { getMemberInfo } from '../../../api/api';

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
  const [stack, setStack] = useState();
  const [stackSearch, setStackSearch] = useState('');
  const [projectSearch, setProjectSearch] = useState('');
  const [experience, setExperience] = useState('');
  const [certificate, setCertificate] = useState('');
  const [selectedInterest, setSelectedInterest] = useState('선택하기');

  const [member, setMember] = useState({
    name: '',
    email: '',
    interest: [],
    stack: [],
    project: [],
    certificate: [],
  });

  useEffect(() => {
    getMemberInfo().then((res) => {
      console.log(res.data);
      setStack(res.data.stack);
      setExperience(res.data.experience);})
    }, []);

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

  const handleInterest = (e) => {
    const { id, value } = e.target;
    setSelectedInterest(value);
  }

  const handleDeleteBtn = (e) => {
    const parent = e.target.parentNode.id;
    console.log(parent);
    setMember((prev) => {
      let current = {...prev};
      console.log(current.interest.filter((item) => parent !== item));
      current.interest = current.interest.filter((item) => parent !== item);
      return current
    });
  }

  const handleUserInput =  (e) => {
    const { id, value } = e.target;
    console.log(value);
    setMember((prev) => {
      const cur = {...prev};
      cur[id] = value;
      return cur
    })
  }

  const showMember = () => {
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
        <select id="interest" value={selectedInterest} onChange={handleInterest}>
          {interestList.map((item) => {
            return (
              <option value={item}>{item}</option>
            );
          })}
        </select>
        {member.interest.map((item) => {
          return (
            <li id={item}>
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
      <input placeholder='' type="text" value={stackSearch} onChange={(e) => setStackSearch(e.target.value)}/>
    </div>
    {stack && stack.map((item) => {
      return (
        <>
        <i class={item.stack_icon} style={{"fontSize": "60px"}}></i>
        </>
      );
    })}
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
      onChange={(e) => setCertificate(e.target.value)}/>
      <button onClick={showMember}>추가하기</button>
    </div>
    {member.certificate.map((item) => {
      return (
        <div>{item}</div>
      );
    })}
  </div>
  )
}

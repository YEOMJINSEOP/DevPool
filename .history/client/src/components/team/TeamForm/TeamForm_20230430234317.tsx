import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '../../../recoil/user';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './TeamForm.module.css';
type TechStack = {
  name: string;
}

type Team = {
  name: string;
  category: string;
  currentCount: number;
  recruitCount: number;
  recruitDomain: string[];
  recruitStack: string[];
};

function TeamForm(){
  const navigate = useNavigate();
  const user = useRecoilValue(userState);
  
  const [team, setTeam] = useState<Team>({
    name: '',
    category: '',
    currentCount: 1,
    recruitCount: 1,
    recruitDomain: [],
    recruitStack: [],
  });


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = event.target;
    console.log(name, value);
    setTeam((prevTeam) => ({
      ...prevTeam,
      [name]: name.includes('Count') ? parseInt(value) : value,
    }));
  };

  const [contentCount, setContentCount] = useState<number>(0);
  const handleContentInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContentCount(event.target.value.length);
    setTeam((prevTeam) => ({
      ...prevTeam,
      ['content']: event.target.value,
    }));
  };

  const [teamNameCount, setTeamNameCount] = useState<number>(0);
  const handleTeamName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTeamNameCount(event.target.value.length);
    setTeam((prevTeam) => ({
      ...prevTeam,
      ['name']: event.target.value,
    }));
  };

  const [techStack, setTechStack] = useState<string[]>([]);
  useEffect(() => {
    axios.get('data/techStack.json')
    .then((res) => res.data.map((stack:TechStack) => {
        console.log(stack.name);
        setTechStack((prev) => [...prev, stack.name]);
      }
    ))
  }, []);

  const [selectedTechStack, setSelectedTechStack] = useState<string[]>([]);
  const handleSelectTechStack = (event: React.MouseEvent<HTMLImageElement>): void => {
    const target = event.target as HTMLImageElement;
    const clickedValue = target.alt;
    if(selectedTechStack.includes(clickedValue)){
      setSelectedTechStack(
        selectedTechStack.filter((stack) => 
          stack != clickedValue
        )
      )
    }
    else{
      setSelectedTechStack((prev) => 
      [...prev, clickedValue]
      );
    }
  }

  
  const [stackInput, setStackInput] = useState<string>('');
  const handleStackInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setStackInput(event.target.value);
  };

  const updateStackInput = (event: React.MouseEvent<HTMLLIElement> ): void => {
    setStackInput(event.currentTarget.innerText);
  }

  const handleAddStack = () => { 
    if(stackInput === '' || team.recruitStack.includes(stackInput)){
      setStackInput('');
      return;
    };
    setTeam((prevTeam) => ({
      ...prevTeam,
      recruitStack: [...prevTeam.recruitStack, stackInput],
    }));
    setStackInput('');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAddStack();
    }
  };

  const handleRecruitDomain = (selectedTechStack: string[]) => {
    setTeam((prevTeam) => ({
      ...prevTeam,
      ['recruitDomain']: [...prevTeam.recruitStack, ...selectedTechStack]
    }))
  }

  const handleSubmit = (): void => {
    handleRecruitDomain(selectedTechStack);
    console.log(team);
    axios.post(`${process.env.REACT_APP_API_URL}/teamForm`, team)
    .then(res => {
      console.log(res, 'team post가 완료되었습니다.');
      navigate('/teamList');
    })
    .catch(err => {
      console.error(err, 'team post에 실패했습니다.' );
    })
    return;
  }

  return (
    <div className={styles.teamFormContainer}>
      <div className={styles.teamForm}>
        <div className={`${styles.container}`}>
          <label className={styles.label}htmlFor='name'>팀 이름</label>
          <input className={styles.inputTeamName} type="text" name='name' id='name' value={team.name} onChange={handleTeamName} maxLength={20}/>
          {/* <span>{teamNameCount}/20</span> */}
        </div>
        <div className={styles.categoryAndCount_container}>
          <div className={`${styles.container} ${styles.category}`}>
            <label className={styles.label}htmlFor='category'>카테고리</label>
            <select className={styles.selectCommon} name='category' id='category' value={team.category} onChange={handleInputChange}>
              <option value="web">Web</option>
              <option value="mobile">Mobile App</option>
            </select>
          </div>
          <div className={`${styles.container} ${styles.recruitCount}`}>
            <label className={styles.label}htmlFor="recruitCount">모집 인원</label>
            <select className={styles.selectCommon} name="recruitCount" id="recruitCount" value={team.recruitCount} onChange={handleInputChange}>
              <option defaultValue="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="미정">미정</option>
            </select>
          </div>          
        </div>
        <div className={`${styles.container}`}>
          <label className={styles.label}htmlFor="recruitField">모집 분야</label>
          <div className={styles.recruitFieldList}>
            <div className={styles.recruitField}>
              <img className={styles.recruitFieldIcon} src="/image/javaScript.png" alt="Front-end" onClick={handleSelectTechStack} />
              <p>Front-end</p>
            </div>
            <div className={styles.recruitField}>
              <img className={styles.recruitFieldIcon}src="/image/server.png" alt="Back-end" onClick={handleSelectTechStack} />
              <p>Back-end</p>
            </div>
            <div className={styles.recruitField}>
              <img className={styles.recruitFieldIcon}src="/image/android.png" alt="Android" onClick={handleSelectTechStack}/>
              <p>Android</p>
            </div>
            <div className={styles.recruitField}>
              <img className={styles.recruitFieldIcon}src="/image/apple-logo.png" alt="iOS" onClick={handleSelectTechStack}/>
              <p>iOS</p>
            </div>
            <div className={styles.recruitField}>
            <img className={styles.recruitFieldIcon}src="/image/deep-learning.png" alt="AI" onClick={handleSelectTechStack}/>
              <p>AI</p>
            </div>
          </div>
        </div>

        <div className={`${styles.container}`}>
          <label className={styles.label}htmlFor="stack-search">모집 스택</label>
          <input className={styles.inputCommon} type="text" id='stack-search' value={stackInput} onChange={handleStackInput} onKeyDown={handleKeyDown}/>
          <button className={styles.addBtn} type="button" onClick={handleAddStack}>추가</button>
          <div className={styles.relatedContainer}>
            <ul className={styles.relatedList}>
              {
                (techStack.filter((stack) => 
                  stackInput && (stack.includes(stackInput.toLowerCase()) || stack.includes(stackInput.toUpperCase()))
                ))
                .map(
                  (stack) => {
                  return <li className={styles.relatedStack} key={stack} onClick={updateStackInput}>{stack}</li>
                })
              }
            </ul>
          </div>
        </div>
        <div className={styles.currentStack}>
            <ul>
              {team.recruitStack.map((stack) => (
                <li className={styles.stack} key={stack}><span>{stack}</span></li>
              ))}
            </ul>
        </div>
        <div className={`${styles.container} ${styles.content}`}>
          <label className={styles.label}htmlFor="stack-search">팀 소개</label>          
          <textarea className={styles.textareaCommon} name="content" id="content" cols={30} rows={10} maxLength={300} onChange={handleContentInput}></textarea>
          {/* <p>{contentCount} / 300</p> */}
        </div>
        <button className={styles.submitBtn} type="button" onClick={handleSubmit}>팀 등록하기</button>
      </div>
    </div>
  )
}

export default TeamForm;
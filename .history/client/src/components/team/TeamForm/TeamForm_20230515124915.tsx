import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '../../../recoil/user';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './TeamForm.module.css';
import Label from '../../common/Label/Label';
import TechField from '../../common/TechField/TechField';
import StackTags from '../../user/UserInfo/StackTags';
import StackField from '../../user/UserInfo/StackField';

type TechStack = {
  name: string;
}

type Team = {
  name: string;
  category: string;
  // currentCount: number;
  recruitCount: number;
  recruitField: string[];
  recruitStack: string[];
  content: string
};

type CurrentField = {
  [key: string]: boolean;
}

function TeamForm(){
  const navigate = useNavigate();
  const user = useRecoilValue(userState);
  
  const [team, setTeam] = useState<Team>({
    name: '',
    category: '',
    // currentCount: 1,
    recruitCount: 1,
    recruitField: [],
    recruitStack: [],
    content: ''
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

  // const [techStack, setTechStack] = useState<string[]>([]);
  // useEffect(() => {
  //   axios.get('data/techStack.json')
  //   .then((res) => res.data.map((stack:TechStack) => {
  //       console.log(stack.name);
  //       setTechStack((prev) => [...prev, stack.name]);
  //     }
  //   ))
  // }, []);

  const handleRecruitField = (selectedTechStack: CurrentField) => {
    const trueTechStack =  Object.entries(selectedTechStack).
      filter(([key, value]) => value === true)
      .map(([key]) => key);
    setTeam((prevTeam) => ({
      ...prevTeam,
      recruitField: trueTechStack
    }))
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

  /** selectedTechStack에서 true인 것만 team의 recruitField에 넣도록 하는 함수 필요 */

  const handleSubmit = (): void => {
    const teamForSubmit = {
      memberId: 1,
      name: team.name,
      categoryName: team.category,
      recruitNum: team.recruitCount,
      recruitTechFieldNameList: team.recruitField,
      recruitStackNameList: team.recruitStack,
      content: team.content
    }
    axios.post(`http://13.124.112.157/api/team`, teamForSubmit)
    .then(res => {
      console.log(res, 'team post가 완료되었습니다.');
      navigate('/teamList');
    })
    .catch(err => {
      console.log(teamForSubmit);
      console.error(err, 'team post에 실패했습니다.' );
    })
    return;
  }

  const [selectedStack, setSelectedStack] = useState<string[]>([]);

  const handleSelectedStack = (event: any, values: string[]) => {
    setTeam((prevTeam) => ({
      ...prevTeam,
      recruitField: selectedStack
    }))
  };


  return (
    <div className={styles.teamFormContainer}>
      <div className={styles.teamForm}>
        <div className={`${styles.container}`}>
          <Label content={"팀 이름"}></Label>
          <input className={styles.inputTeamName} type="text" name='name' id='name' value={team.name} onChange={handleTeamName} maxLength={20}/>
          {/* <span>{teamNameCount}/20</span> */}
        </div>
        <div className={styles.categoryAndCount_container}>
          <div className={`${styles.container} ${styles.category}`}>
            <Label content={"카테고리"}></Label>
            <select className={styles.selectCommon} name='category' id='category' value={team.category} onChange={handleInputChange}>
              <option value="web">Web</option>
              <option value="mobile">Mobile App</option>
            </select>
          </div>
          <div className={`${styles.container} ${styles.recruitCount}`}>
            <Label content={"모집 인원"}></Label>
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
          <Label content={"모집 분야"}></Label>
          <TechField onChange={handleRecruitField}/>
        </div>

        {/* <div className={`${styles.container}`}>
          <Label content={"모집 스택"}></Label>
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
        </div> */}

        <StackTags selectedStack={selectedStack} handleSelectedStack={handleSelectedStack} />
        <StackField selectedStack={selectedStack}/>

        <div className={`${styles.container} ${styles.content}`}>
          <Label content="팀 소개"></Label>        
          <textarea className={styles.textareaCommon} name="content" id="content" cols={30} rows={10} maxLength={300} onChange={handleContentInput}></textarea>
          {/* <p>{contentCount} / 300</p> */}
        </div>
        <button className={styles.submitBtn} type="button" onClick={handleSubmit}>팀 등록하기</button>
      </div>
    </div>
  )
}

export default TeamForm;
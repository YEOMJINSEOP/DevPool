import React, {useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './TeamForm.module.css';
import Label from '../../common/Label/Label';
import TechField from '../../common/TechField/TechField';
import StackTags from '../../user/UserInfo/StackTags';
import StackField from '../../user/UserInfo/StackField';
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

type category = {
  name: string;
}

type Team = {
  name: string;
  category: category;
  recruitCount: number;
  recruitField: recruitField[];
  recruitStack: recruitStack[];
  content: string
};

type CurrentField = {
  [key: string]: boolean;
}

function TeamForm(){
  const navigate = useNavigate();
  
  const [team, setTeam] = useState<Team>({
    name: '',
    category: {name: 'Web'},
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

  const handleCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log('🔥', event.target.value);
    setTeam((prevTeam) => ({
      ...prevTeam,
      category: {name: event.target.value},
    }));
  }


  const handleTeamName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTeam((prevTeam) => ({
      ...prevTeam,
      ['name']: event.target.value,
    }));
  };

  const handleContentInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTeam((prevTeam) => ({
      ...prevTeam,
      ['content']: event.target.value,
    }));
  };

  const handleRecruitField = (selectedTechStack: CurrentField) => {
    const trueTechStack =  Object.entries(selectedTechStack).
      filter(([key, value]) => value === true)
      .map(([key]) => ({
        name: key
      }));
      console.log(trueTechStack);
    setTeam((prevTeam) => ({
      ...prevTeam,
      recruitField: trueTechStack
    }))
  }
  const [loggedInUserId, setLoggedInUserId] = useState<string>('');
  useEffect(() => {
    setLoggedInUserId(getMemberId().memberId);
  },[])


  const handleSubmit = (): void => {
    const teamForSubmit = {
      hostMemberId: loggedInUserId,
      name: team.name,
      category: team.category,
      recruitCount: team.recruitCount,
      recruitTechField: team.recruitField,
      recruitStack: team.recruitStack,
      content: team.content
    }
    axios.post(`http://13.124.112.157/api/team`, teamForSubmit)
    .then(res => {
      console.log(res, 'team post가 완료되었습니다.');
      navigate('/team/list');
    })
    .catch(err => {
      console.log(teamForSubmit);
      console.error(err, 'team post에 실패했습니다.' );
    })
    return;
  }

  const [selectedStack, setSelectedStack] = useState<string[]>([]);
  
  const handleSelectedStack = (event: any, values: string[]) => {
    setSelectedStack(values);
    setTeam((prevTeam) => ({
      ...prevTeam,
      ['recruitStack']: [...prevTeam.recruitStack, ...selectedStack.map((stack) => ({
        name: stack
      }))]
    }));
  };

  return (
    <div className={styles.teamFormContainer}>
      <div className={styles.teamForm}>
        <div className={`${styles.container}`}>
          <Label content={"팀 이름"}></Label>
          <input className={styles.inputTeamName} type="text" name='name' id='name' onChange={handleTeamName} value={team.name} maxLength={20}/>
        </div>
        <div className={styles.categoryAndCount_container}>
          <div className={`${styles.container} ${styles.category}`}>
            <Label content={"카테고리"}></Label>
            <select className={styles.selectCommon} name='category' id='category' value={team.category.name} onChange={handleCategory}>
              <option defaultValue="Web">Web</option>
              <option value="App">App</option>
              <option value="AI">AI</option>
            </select>
          </div>
          <div className={`${styles.container} ${styles.recruitCount}`}>
            <Label content={"팀 인원"}></Label>
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

        <StackTags selectedStack={selectedStack} handleSelectedStack={handleSelectedStack} />
        <StackField selectedStack={selectedStack}/>

        <div className={`${styles.container} ${styles.content}`}>
          <Label content="팀 소개"></Label>        
          <textarea className={styles.textareaCommon} name="content" id="content" cols={30} rows={10} maxLength={300} onChange={handleContentInput}></textarea>
        </div>
        <div className={styles.btnContainer}>
          <button className={styles.submitBtn} type="button" onClick={handleSubmit}>팀 등록하기</button>
        </div>        
      </div>
    </div>
  )
}

export default TeamForm;
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

type recruitField = {
  name: string;
}

type recruitStack = {
  name: string;
}

type Team = {
  name: string;
  category: string;
  recruitCount: number;
  recruitField: recruitField[];
  recruitStack: string[];
  content: string
};

type CurrentField = {
  [key: string]: boolean;
}

function TeamForm(){
  const navigate = useNavigate();
  // const user = useRecoilValue(userState);
  
  const [team, setTeam] = useState<Team>({
    name: '',
    category: '',
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


  const handleRecruitField = (selectedTechStack: CurrentField) => {
    const trueTechStack =  Object.entries(selectedTechStack).
      filter(([key, value]) => value === true)
      .map(([key]) => ({
        name: key
      }));
      console.log(trueTechStack);
    // setTeam((prevTeam) => ({
    //   ...prevTeam,
    //   recruitField: trueTechStack
    // }))
  }


  const handleSubmit = (): void => {
    const teamForSubmit = {
      hostMemberId: 1,
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
    setSelectedStack(values);
    setTeam((prevTeam) => ({
      ...prevTeam,
      recruitStack: selectedStack
    }))
  };


  return (
    <div className={styles.teamFormContainer}>
      <div className={styles.teamForm}>
        <div className={`${styles.container}`}>
          <Label content={"팀 이름"}></Label>
          <input className={styles.inputTeamName} type="text" name='name' id='name' value={team.name} maxLength={20}/>
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

        <StackTags selectedStack={selectedStack} handleSelectedStack={handleSelectedStack} />
        <StackField selectedStack={selectedStack}/>

        <div className={`${styles.container} ${styles.content}`}>
          <Label content="팀 소개"></Label>        
          <textarea className={styles.textareaCommon} name="content" id="content" cols={30} rows={10} maxLength={300}></textarea>
        </div>
        <button className={styles.submitBtn} type="button" onClick={handleSubmit}>팀 등록하기</button>
      </div>
    </div>
  )
}

export default TeamForm;
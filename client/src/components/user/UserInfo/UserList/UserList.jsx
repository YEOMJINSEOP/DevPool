import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './UserList.module.css';
import UserBlock from './UserBlock';
import { BASE_URL } from '../LogIn/LogIn';

function UserList(){
    const navigate = useNavigate();

    const [member, setMember] = useState([
        {
        name: '이영진',
        email: 'qwer@naver.com',
        interest: ['Front-end', 'IOS'],
        stack: ["HTML", "CSS", "JS", "React"],
        project: [
            {
                id: 1, 
                content: '산학프로젝트',
                start: '2023-01',
                end: '2023-02',
                stack: ["HTML", "CSS"]
            },
            {
                id: 2, 
                content: '프로젝트',
                start: '2023-02',
                end: '2023-05',
                stack: ["HTML", "CSS"]
            }
        ],
        certificate: ["SQLD", "운전면허 1종"],
        relatedSite: ['wwww.nanver.com', 'www.google.com'],
        }
      ]);

      useEffect(()=> {
        axios.get(`${BASE_URL}/api/member-pools`).then((res)=>{
          setMember(res.data.dataList);
          console.log(res.data.dataList);
        })
        .catch((err) => console.log(err));
      }, []);

      const [filteredMember, setFilteredMember] = useState([]);
  
      const handleFilter = (event, selectedCategory) => {
        if(selectedCategory === "All"){
          setFilteredMember(member);
        }
        else {
          let filteredList = member.filter((user) => {
            // techField 배열에 selectedCategory 값이 포함되어 있는지 확인
            return user.techField.some((field) => field.name === selectedCategory);
          });
        
          setFilteredMember(filteredList);
        }
      };
      

  return (
    <div className={styles.teamListContainer}>
        <div className={styles.recruitFieldList}>
            <div className={styles.recruitField} onClick={(e) => handleFilter(e, "All")}>
                <span className={styles.recruitFieldIcon} style={{fontSize: "25px", fontWeight: "600"}}>All</span>
                <p>All</p>
            </div>
            <div className={styles.recruitField} onClick={(e) => handleFilter(e, "Front-end")}>
              <img className={styles.recruitFieldIcon}src="/image/javaScript.png" alt="" />
              <p>Front-end</p>
            </div>
            <div className={styles.recruitField} onClick={(e) => handleFilter(e, "Back-end")}>
              <img className={styles.recruitFieldIcon}src="/image/server.png" alt="" />
              <p>Back-end</p>
            </div>
            <div className={styles.recruitField} onClick={(e) => handleFilter(e, "Android")}>
              <img className={styles.recruitFieldIcon}src="/image/android.png" alt="" />
              <p>Android</p>
            </div>
            <div className={styles.recruitField} onClick={(e) => handleFilter(e, "iOS")}>
              <img className={styles.recruitFieldIcon}src="/image/apple-logo.png" alt="" />
              <p>IOS</p>
            </div>
            <div className={styles.recruitField} onClick={(e) => handleFilter(e, "AI")}>
            <img className={styles.recruitFieldIcon}src="/image/deep-learning.png" alt="" />
              <p>AI</p>
            </div>
        </div>
        <div className={styles.userBlockWrapper}>
        {filteredMember.map((user) => {
          return (
            <UserBlock user={user} />
          )
        })}
        </div>
    </div>
  )
}

export default UserList;
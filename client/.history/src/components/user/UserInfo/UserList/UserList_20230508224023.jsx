import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './UserList.module.css';

function UserList(){
    const navigate = useNavigate();

    const [member, setMember] = useState(
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
        },
        {
        name: '김태우',
        email: 'asdf@kakao.com',
        interest: ['Back-end', 'Android'],
        stack: ["Java(Spring)", "Computer vision(AI)", "Android"],
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
        certificate: ["AWS", "공인회계사"],
        relatedSite: ['www.linkedin.com', 'www.yahoo.co.kr'],
        },
        {
        name: '염진섭',
        email: 'zxcv@google.com',
        interest: ["AI", "Front-end"],
        stack: ["Deep learning(AI)", "React", "HTML"],
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
        certificate: ["정보처리기사", "SQLD"],
        relatedSite: ['www.kakao.com', 'www.naver.com'],
        }
        );




  return (
    <div className={styles.teamListContainer}>
        <div className={styles.recruitFieldList}>
            <div className={styles.recruitField}>
                <span className={styles.recruitFieldIcon} style={{fontSize: "25px", fontWeight: "600"}}>All</span>
                <p>All</p>
            </div>
            <div className={styles.recruitField}>
              <img className={styles.recruitFieldIcon}src="/image/javaScript.png" alt="" />
              <p>Front-end</p>
            </div>
            <div className={styles.recruitField}>
              <img className={styles.recruitFieldIcon}src="/image/server.png" alt="" />
              <p>Back-end</p>
            </div>
            <div className={styles.recruitField}>
              <img className={styles.recruitFieldIcon}src="/image/android.png" alt="" />
              <p>Android</p>
            </div>
            <div className={styles.recruitField}>
              <img className={styles.recruitFieldIcon}src="/image/apple-logo.png" alt="" />
              <p>iOS</p>
            </div>
            <div className={styles.recruitField}>
            <img className={styles.recruitFieldIcon}src="/image/deep-learning.png" alt="" />
              <p>AI</p>
            </div>
        </div>
        <ul className={styles.teamList}>
          {/* {teamList.map((team) => {
            return(
              <li key={team.name}>
                <UserBlock {...member}/>
              </li>
            )
          })} */}
        </ul>
    </div>
  )
}

export default UserList;
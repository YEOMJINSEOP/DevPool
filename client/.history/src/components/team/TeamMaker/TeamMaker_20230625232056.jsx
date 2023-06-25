import {read, utils} from 'xlsx';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import styles from './TeamMaker.module.css';

function TeamMaker() {

  const [students, setStudents] = useState([]);
  const [teams, setTeams] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const allData = utils.sheet_to_json(ws);
      // 역할이 '학생'인 데이터만 필터링합니다.
      const data = allData
      .filter(item => item.역할 === '학생')
      .map(student => ({
        이름: student.이름,
        학과: student.학과,
        학번: student.학번
      }));      // 이제 'data'는 학생들의 정보가 들어있는 객체 배열입니다.
      setStudents(data);
    };
    reader.readAsBinaryString(file);
  };

  const generateTeams = (students, teamSize) => {
    const shuffledStudents = _.shuffle(students);
    const teams = _.chunk(shuffledStudents, teamSize);
    return teams;
    // 이제 'teams'는 랜덤으로 분배된 팀들의 배열입니다.
  };

  const handleGenerateTeams = (teamSize) => {
    const newTeams = generateTeams(students, teamSize);
    setTeams(newTeams);  // 생성된 팀들을 상태에 저장합니다.
  };

  useEffect(() => {
    console.log(students);
  }, [students])

  useEffect(() => {
    console.log(teams);
  }, [teams])
  
  return (
    <div>
      <div className={styles.fileInput}>
        <input type="file" accept=".xlsx" onChange={handleFileUpload} />
        <button className={styles.createBtn} onClick={() => handleGenerateTeams(5)}>팀 생성</button>
      </div>
      <div>
        {teams.map((team, index) => (
        <div key={index} className={styles.teamBlock}>
          <h2>팀 {index + 1}</h2>
          {team.map(student => (
            <p key={student.번호}>{student.이름}</p>
          ))}
        </div>
        ))}
        </div>
    </div>
  );
}

export default TeamMaker;
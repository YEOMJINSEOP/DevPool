import {write, read, utils} from 'xlsx';
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

  const handleDownload = () => {
    let newWorkbook = utils.book_new(); // 새 workbook 생성
    // 각 팀을 순회하면서 시트를 만들고 추가합니다.
    teams.forEach((team, index) => {
      let newWorksheet = utils.json_to_sheet(team);
      utils.book_append_sheet(newWorkbook, newWorksheet, `Team ${index + 1}`);
    });
  
    // workbook을 blob으로 쓴 다음, 이 blob을 사용하여 다운로드 링크를 생성합니다.
    const workbookBinary = write(newWorkbook, { type: 'array', bookType: 'xlsx' });
    const blob = new Blob([workbookBinary], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'teams.xlsx';  // 원하는 파일명을 설정합니다.
    link.click();  // 다운로드를 시작합니다.
  
    // URL을 해제합니다.
    URL.revokeObjectURL(url);
  };
  
  
  return (
    <div>
      <div className={styles.header}>
        <div className={styles.fileContainer}>
          <p>Excel File 업로드</p>
          <input className={styles.fileInput} type="file" accept=".xlsx" onChange={handleFileUpload} />
        </div>        
        <button className={styles.createBtn} onClick={() => handleGenerateTeams(5)}>팀 생성</button>
        {teams && <button className={styles.downloadBtn} onClick={handleDownload}>팀 다운로드 </button>}
      </div>
      <div className={styles.teamContainer}>
        {teams.map((team, index) => (
        <div key={index} className={styles.teamBlock}>
          <h2 className={styles.teamHeader}>팀 {index + 1}</h2>
          <div className={styles.divider}></div>
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
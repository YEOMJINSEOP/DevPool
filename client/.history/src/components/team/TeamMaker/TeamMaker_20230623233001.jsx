import {read, utils} from 'xlsx';
import _ from 'lodash';
import { useEffect, useState } from 'react';

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
      const data = allData.filter(item => item.역할 === '학생');
      // 이제 'data'는 학생들의 정보가 들어있는 객체 배열입니다.
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
  
  return (
    <div>
      <input type="file" accept=".xlsx" onChange={handleFileUpload} />
      <button onClick={() => handleGenerateTeams(5)}>팀 생성</button>
    </div>
  );
}

export default TeamMaker;
import {read, utils} from 'xlsx';
import _ from 'lodash';

function TeamMaker() {

  const [students, setStudents] = useState([]);

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
  
  return (
    <div>
      <input type="file" accept=".xlsx" onChange={handleFileUpload} />
    </div>
  );
}

export default TeamMaker;
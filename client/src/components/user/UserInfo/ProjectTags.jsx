import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHtml5, faJsSquare, faJava, faCss3Alt, faVuejs, faReact, faAngular, faNode, faApple, faAndroid } from '@fortawesome/free-brands-svg-icons'
import { faMicrochip, faArrowsToEye } from '@fortawesome/free-solid-svg-icons';

export default function ProjectTags({ projectStasck, handleProjectStack }) {
    
  return (
    <Stack spacing={3} sx={{ width: 300 }}>
      <Autocomplete
        multiple
        id="tags-standard"
        limitTags={3}
        options={stackOptions}
        getOptionLabel={getOptionLabel}
        value={projectStasck}
        onChange={handleProjectStack}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Select Stack"
            placeholder="Favorites"
          />
        )}
      />
    </Stack>
  );
}

function getOptionLabel(option) {
  // 아이콘과 라벨을 함께 표시하기 위해 div 요소를 반환합니다.
  return (
    <div key={option.id}>
      {option.icon}
      {option.label}
    </div>
  );
}

const stackOptions = [
  { id: '1', label: 'HTML', icon: <FontAwesomeIcon icon={faHtml5} size="xl" style={{color: "#f77408",}} /> },
  { id: '2', label: 'CSS', icon: <FontAwesomeIcon icon={faCss3Alt} size="xl" style={{color: "#104094",}} /> },
  { id: '3', label: 'JavaScript', icon: <FontAwesomeIcon icon={faJsSquare} size="xl" style={{color: "#ebee20",}} /> },
  { id: '4', label: 'Vue.js', icon: <FontAwesomeIcon icon={faVuejs} size="xl" style={{color: "#4d8217",}} /> },
  { id: '5', label: 'React.js', icon: <FontAwesomeIcon icon={faReact} size="xl" style={{color: "#3a8fcf",}} /> },
  { id: '6', label: 'Angular', icon: <FontAwesomeIcon icon={faAngular} size="xl" style={{color: "#b91d1b",}} /> },
  { id: '7', label: 'Node.js', icon: <FontAwesomeIcon icon={faNode} size="xl" style={{color: "#5fb922",}} /> },
  { id: '8', label: 'Java(Spring)', icon: <FontAwesomeIcon icon={faJava} size="xl" style={{color: "#20426f",}} /> },
  { id: '9', label: 'Deep learning(AI)', icon: <FontAwesomeIcon icon={faMicrochip} size="xl" style={{color: "#235ab8",}} /> },
  { id: '10', label: 'Computer Vision', icon: <FontAwesomeIcon icon={faArrowsToEye} size="xl" style={{color: "#298b9e",}} /> },
  { id: '11', label: 'IOS', icon: <FontAwesomeIcon icon={faApple} size="xl" style={{color: "#0d0d0d",}} /> },
  { id: '12', label: 'Android', icon: <FontAwesomeIcon icon={faAndroid} size="xl" style={{color: "#5fb922",}} /> },
]
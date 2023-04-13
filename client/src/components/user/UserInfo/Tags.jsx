import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

export default function Tags({ selectedStack, handleSelectedStack }) {
  const [selectedOptions, setSelectedOptions] = React.useState([]);

  const handleSelectOption = (event, values) => {
    setSelectedOptions(values);
    console.log(values);
  };

  
  return (
    <Stack spacing={3} sx={{ width: 500 }}>
      <Autocomplete
        multiple
        id="tags-standard"
        options={stackOptions}
        getOptionLabel={(option) => option}
        value={selectedStack}
        onChange={handleSelectedStack}
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

const stackOptions = [
    'HTML',
    'CSS',
    'Java Script',
    'Vue.js',
    'React',
    'Angular',
    'Spring',
    'Java',
    'Deep learning(AI)',
    'Computer Vision(AI)'
]
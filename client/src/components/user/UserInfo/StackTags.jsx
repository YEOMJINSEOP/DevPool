import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

export default function StackTags({ selectedStack, handleSelectedStack }) {
  
  return (
    <Stack spacing={3} sx={{ width: 500 }}>
      <Autocomplete
        multiple
        id="tags-standard"
        limitTags={3}
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
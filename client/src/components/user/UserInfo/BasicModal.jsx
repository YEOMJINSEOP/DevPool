import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({project, handleProject, projectStack, handleProjectStack, projectStart, handleProjectStart, projectEnd, handleProjectEnd, handleAddBtn}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  return (
    <div>
      <Button onClick={handleOpen}>프로젝트 추가하기</Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            프로젝트 경험을 입력해주세요!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            프로젝트 내용
          </Typography>
          <input
          value={project}
          onChange={handleProject}/>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            사용 스택
          </Typography>
          <input
          value={projectStack}
          onChange={handleProjectStack}/>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            프로젝트 기간
          </Typography>
          <input 
          value={projectStart}
          onChange={handleProjectStart}
          type='month'/>
          <input 
          value={projectEnd}
          onChange={handleProjectEnd}
          type='month'/>
          <p></p><button id='project' onClick={handleAddBtn}>제출하기</button>
          <p></p><button onClick={handleClose}>창닫기</button>
        </Box>
      </Modal>
    </div>
  )
}

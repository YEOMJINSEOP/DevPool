import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ProjectTags from './ProjectTags';
import styles from './BasicModal.module.css';
import StackTags from './StackTags';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // width: 600,
  // height: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: '20px',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({project, handleProject, projectStack, handleProjectStack, projectStart, handleProjectStart, projectEnd, handleProjectEnd, handleAddBtn, projectUrl, handleProjectUrl}) {
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
          className={styles.project_nameInput}
          value={project}
          onChange={handleProject}/>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            사용 스택
          </Typography>
          <ProjectTags 
          projectStack={projectStack}
          handleProjectStack={handleProjectStack}/>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            프로젝트 기간
          </Typography>
          <input 
          className={styles.project_startInput}
          value={projectStart}
          onChange={handleProjectStart}
          type='month'/>
          <input 
          className={styles.project_endInput}
          value={projectEnd}
          onChange={handleProjectEnd}
          type='month'/>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            프로젝트 URL
          </Typography>
          <input
          className={styles.project_nameInput}
          value={projectUrl}
          onChange={handleProjectUrl}
          type='text'/>
          <p></p><button id='project' onClick={(e)=>{handleAddBtn(e); handleClose();}} className={styles.project_submitBtn}>제출하기</button>
          <p></p><button onClick={handleClose} className={styles.project_closeBtn}>창닫기</button>
        </Box>
      </Modal>
    </div>
  )
}

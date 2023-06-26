import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from './FreeBoard.module.css'
import axios from 'axios';
import { BASE_URL, getMemberId } from '../LogIn/LogIn';

const FreeBoard = () => {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleChange = (value) => {
    setContent(value);
  };

  const handleSubmit = () => {
    // 게시글 작성 처리 로직
    console.log(content);
    
    const id = getMemberId().memberId;
    console.log(id);

    axios.post(`${BASE_URL}/api/board`, {
        memberId: 1,
        title: title,
        content: content
    })
    .then((res) => {
        console.log(res);
    })
    .catch()
    .then(() => {
        setTitle('');
        setContent('');
    })
  };

  return (
    <div style={{ maxWidth: "820px", margin: "auto", padding: "60px" }}>
      <h1 style={{ marginBottom: "30px" }}>자유게시판</h1>
      <label>제목</label>
      <input value={title} onChange={e => setTitle(e.target.value)} className={styles.title_input}/>
      <div style={{ minHeight: "352px", marginTop: "30px" }}>
      <div style={{display: "flex"}}>
      <div style={{marginBottom: "20px", marginRight: "15px"}}>
        <label>내용</label>
      </div>
      <div style={{width: "620px"}}>
        <ReactQuill value={content} onChange={handleChange} className={styles.text_area} />
      </div>
      </div>
      </div>
      <button onClick={handleSubmit} style={{ marginTop: "40px" }} className={styles.submit_btn}>작성 완료</button>
    </div>
  );
};

export default FreeBoard;
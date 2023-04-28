import React from 'react'
import Input from '@mui/joy/Input';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import styles from './LogIn.module.css';
import { useNavigate } from 'react-router-dom';

export default function LogIn() {
  
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const naviagte = useNavigate();

  const navigateToSignUp = () => {
    naviagte('/signUp');
  }
    
  return (
    <div className={styles.login_wrapper}>
      <h1 className={styles.login_title}>Welcome to<span className={styles.login_title_logo}> Dev Pool!</span></h1>
        <div>
            <Input
            className={styles.inputs}
            color="primary"
            disabled={false}
            placeholder="Email"
            size="lg"
            variant="outlined"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            type='email'
            />
            <Input
            className={styles.inputs}
            color="primary"
            disabled={false}
            placeholder="Password"
            size="lg"
            variant="outlined"
            value={pwd}
            onChange={(e)=>setPwd(e.target.value)}
            type='password'
            />
            <span className={styles.loginTosignUp_message}>아직 회원가입을 안 하셨나요?</span>
            <span onClick={navigateToSignUp} className={styles.loginTosignUp}>회원가입</span>
        </div>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" className={styles.submitBtn}>로그인</Button>
        </Stack>
    </div>
  )
}

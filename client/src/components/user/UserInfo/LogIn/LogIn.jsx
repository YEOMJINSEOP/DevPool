import React from 'react'
import Input from '@mui/joy/Input';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import styles from './LogIn.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { isLoggedIn, memberId } from '../../../../recoil/user';

export const BASE_URL = process.env.REACT_APP_API_URL;
export const getMemberId = () => {
  const devAccessToken = localStorage.getItem('dev_access_token');
  if (devAccessToken != null) {
    const base64Url = devAccessToken.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decodedData = JSON.parse(atob(base64));
    return decodedData;
  }
  else {
    return null;
  }
  
}

export default function LogIn() {
  
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const naviagte = useNavigate();
  const [loggedIn, setLoggedIn] = useRecoilState(isLoggedIn);
  const [id, setId] = useRecoilState(memberId);

  const navigateToSignUp = () => {
    naviagte('/signUp');
  }

  const handleLogin = async() => {
    try {
      const res = await axios.post(`${BASE_URL}/login`, {
          email: email,
          password: pwd,
      });
      if(res.status !== 200){
          alert('로그인 실패. 아이디 비밀번호를 확인해주세요.');
          return;
      }
      console.log(res);
      localStorage.setItem("dev_access_token", res.data.accessToken);
      localStorage.setItem("dev_refresh_token", res.data.refreshToken);
      const memberInfo = getMemberId();
      console.log(memberInfo.memberId);
      setId(memberId);
      
      // memberId로 DevPool에 등록되어 있나 확인해보고, 없다면 'user/form'으로 이동
      axios.get(`${BASE_URL}/api/member_pool/${memberInfo.memberId}`)
      .then((res) => {
        setLoggedIn(true);
        alert('DevPool에 오신 걸 환영합니다.');
        naviagte('/');
        console.log(res);
      })
      .catch(()=>{
        setLoggedIn(true);
        alert('DevPool 이용을 위해 기본 정보를 등록해주세요!');
        navigate('/user/form');
      });
      } catch (error) { 
          console.log(error);
      }
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
            <div className={styles.loginTosignUp_wrapper}>
            <span className={styles.loginTosignUp_message}>아직 회원가입을 안 하셨나요?</span>
            <span onClick={navigateToSignUp} className={styles.loginTosignUp}>회원가입</span>
            </div>
        </div>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" sx={{ m: "16px"}} onClick={handleLogin}>로그인</Button>
        </Stack>
    </div>
  )
}

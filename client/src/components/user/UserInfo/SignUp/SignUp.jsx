import Input from '@mui/joy/Input';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import styles from './SignUp.module.css';
import { useNavigate } from 'react-router-dom';
import userBasicImg from '../../../../image/userBasic.png';

export const BASE_URL = process.env.REACT_APP_API_URL;

export default function SignUp() {

  const [name, setName] = useState('');
  const [nickName, setNickName] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [pwdCheck, setpwdCheck] = useState('');
  const [bjId, setBjId] = useState('');
  const [isBjIdExist, setIsBjIdExist] = useState(false);
  const [validEmail, setValidEmail] = useState(true);
  const [ableBtn, setAbleBtn] = useState(true);
  const [IsSamePwd, setIsSamePwd] = useState(false);
  const [image, setImage] = useState();
  const [imageURL, setImageURL] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const pattern = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    pattern.test(email) ? setValidEmail(false) : setValidEmail(true);
  }, [email]);

  useEffect(() => {
    setAbleBtn(!((name != '' && email != '' && pwd != '' && pwdCheck != '') && !validEmail && IsSamePwd));
  }, [name, email, IsSamePwd]);

  useEffect(() => {
    pwd === pwdCheck && pwd != '' && pwdCheck != '' ? setIsSamePwd(true) : setIsSamePwd(false);
  }, [pwd, pwdCheck]);

  const handleImgInput = (event) => {
    setImage(()=>event.target.files[0]);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target.result;
      // base64로 인코딩된 파일 데이터를 사용할 수 있습니다.
      console.log(base64);
      setImageURL(base64)
    };
    reader.readAsDataURL(file);
  }

  // 백준 아이디 존재하는 지 확인
  const checkBjId = async() => {
    const headers = {
      'Content-Type': 'application/json'
    };
    
    axios.get(`https://solved.ac/api/v3/search/user?query=${bjId}`, { headers })
      .then(response => {
        // API 호출 성공 시 실행할 코드
        const { data } = response;
        console.log(data);
        setIsBjIdExist(true);
      })
      .catch(error => {
        // API 호출 실패 시 실행할 코드
        console.error(error);
        alert('아이디가 존재하지 않습니다!');
      });
  }

  const handleSignUpBtn = async() => {

    const formData = new FormData();
    formData.append('name', name);
    formData.append('nickName', nickName);
    formData.append('email', email);
    formData.append('password', pwd);
    if(image == null) {
      const imgFile = new File([userBasicImg], 'userBasicImg.png', { type: 'image/png' });
      formData.append('image', imgFile);
    }
    else {
      formData.append('image', image); // 이미지 추가
      console.log(typeof image);
    }
    
    await axios.post(`${BASE_URL}/join`, formData, {
      headers: {
        'Content-type': 'multipart/form-data',
      },
    })
    .then(req=>console.log(req))
    .then(() => {
      alert('회원가입이 완료되었습니다!')
      setName('');
      setEmail('');
      setNickName('');
      setPwd('');
      setpwdCheck('');
      navigate('/login');
    })
    .catch((err) => alert(err));
  }

return (
  <div className={styles.signUp_wrapper}>
    <h1 className={styles.signUp_title}>Welcome to<span className={styles.signUp_title_logo}> Dev Pool!</span></h1>
    <Input
    className={styles.inputs}
    color="primary"
    disabled={false}
    placeholder="이름"
    size="lg"
    variant="outlined"
    value={name}
    onChange={(e)=>setName(e.target.value)}
    type='text'
    />
    <Input
    className={styles.inputs}
    color="primary"
    disabled={false}
    placeholder="닉네임"
    size="lg"
    variant="outlined"
    value={nickName}
    onChange={(e)=>setNickName(e.target.value)}
    type='text'
    />
    <div className={styles.email_wrap}>
      <Input
      className={styles.inputs}
      color="primary"
      disabled={false}
      placeholder="이메일"
      size="lg"
      variant="outlined"
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      type='text'
      />
      <div className={styles.errorMessage}>
        {validEmail && email.length > 0 && (
          <div>올바른 이메일 형식을 입력해주세요.</div>
        )}
      </div>
    </div>
    <div className={styles.pwdWrap}>
      <div className={styles.bjIdWrap}>
      <Input
      className={styles.inputs}    
      color="primary"
      disabled={isBjIdExist}
      placeholder="백준 아이디"
      size="lg"
      variant="outlined"
      value={bjId}
      onChange={(e)=>setBjId(e.target.value)}
      type='text'
      />
      <button 
      className={styles.bjIdCheck}
      onClick={checkBjId}>
        아이디 확인
      </button>
      </div>
      <Input
      className={styles.inputs}    
      color="primary"
      disabled={false}
      placeholder="비밀번호"
      size="lg"
      variant="outlined"
      value={pwd}
      onChange={(e)=>setPwd(e.target.value)}
      type='password'
      />
      <Input
      className={styles.inputs}    
      color="primary"
      disabled={false}
      placeholder="비밀번호 확인"
      size="lg"
      variant="outlined"
      value={pwdCheck}
      onChange={(e)=>setpwdCheck(e.target.value)}
      type='password'
      />
      <div className={styles.errorMessage}>
        {!IsSamePwd && pwd.length > 0  && pwdCheck.length > 0 && (
          <div>비밀번호가 다릅니다</div>
        )}
      </div>
    </div>
    <div>{image != null ? image.name : ''}</div>
    <Button variant="contained" component="label" sx={{ m: "16px" }}>
        사진 업로드
        <input hidden accept="image/*" multiple type="file" onChange={handleImgInput}/>
    </Button>
    <Stack direction="row" spacing={2}>
      <Button variant="contained" disabled={ableBtn} onClick={handleSignUpBtn}>동의하고 가입하기</Button>
    </Stack>
  </div>
  )
}

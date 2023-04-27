import Input from '@mui/joy/Input';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function SignUp() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [pwdCheck, setpwdCheck] = useState('');
  const [avatar, setAvatar] = useState();
  const [validEmail, setValidEmail] = useState(true);
  const [ableBtn, setAbleBtn] = useState(true);
  const [IsSamePwd, setIsSamePwd] = useState(false);
  const [image, setImage] = useState()
  const [imgPreview, setImgPreview] = useState("");  

  useEffect(() => {
    const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(pattern.test(email)) setValidEmail(false);
    else setValidEmail(true);
  }, [email]);

  useEffect(() => {
    setAbleBtn(!((name != '' && email != '' && pwd != '' && pwdCheck != '') && !validEmail && IsSamePwd));
  }, [name, email, IsSamePwd]);

  useEffect(() => {
    pwd === pwdCheck && pwd != '' && pwdCheck != '' ? setIsSamePwd(true) : setIsSamePwd(false);
  }, [pwd, pwdCheck]);

  const handleImgInput = (event) => {
    setImage(()=>event.target.files[0]);
  }
    
return (
  <div>
    <Input
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
    color="primary"
    disabled={false}
    placeholder="이메일"
    size="lg"
    variant="outlined"
    value={email}
    onChange={(e)=>setEmail(e.target.value)}
    type='text'
    />
    <div>
        {validEmail ? "이메일 형식으로 입력해주세요" : "올바른 이메일 형식입니다"}
    </div>
    <Input
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
    color="primary"
    disabled={false}
    placeholder="password check"
    size="lg"
    variant="outlined"
    value={pwdCheck}
    onChange={(e)=>setpwdCheck(e.target.value)}
    type='password'
    />
    <div>
        {IsSamePwd ? "확인 완료" : "비밀번호가 다릅니다"}
    </div>
    <div>{image != null ? image.name : ''}</div>
    <Button variant="contained" component="label">
        사진 업로드
        <input hidden accept="image/*" multiple type="file" value={avatar} onChange={handleImgInput}/>
    </Button>
    <Stack direction="row" spacing={2}>
      <Button variant="contained" disabled={ableBtn}>동의하고 가입하기</Button>
    </Stack>
  </div>
  )
}

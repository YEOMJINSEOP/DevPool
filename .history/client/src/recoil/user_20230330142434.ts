import {atom} from 'recoil';

interface User {
  id: string;
  name: string;
  email: string;
}

export const userState = atom<User>({
  key: 'userState',
  default: {
    id: '로그인 된 id',
    name: 'default',
    email: 'default',
  }
})
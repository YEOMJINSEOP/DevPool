import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {RouterProvider, createBrowserRouter } from 'react-router-dom';
import {RecoilRoot} from 'recoil';
import MainBanner from './components/main/MainBanner/MainBanner';
import TeamForm from './components/team/TeamForm/TeamForm';
import TeamInfo from './components/team/TeamInfo/TeamInfo';
import TeamList from './components/team/TeamList/TeamList';
import UserInfo from './components/user/UserInfo/UserInfo/UserInfo';
import UserForm from './components/user/UserInfo/UserForm/UserForm';
import Mypage from './components/user/UserInfo/MyPage/Mypage';
import SignUp from './components/user/UserInfo/SignUp/SignUp';
import LogIn from './components/user/UserInfo/LogIn/LogIn';
import UserList from './components/user/UserInfo/UserList/UserList';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // errorElement: 
    children: [
      {index: true, element: <MainBanner />},
      {path: '/userInfo', element: <UserInfo />},
      {path: '/userForm', element: <UserForm />},
      {path: '/myPage', element: <Mypage />},
      {path: '/signUp', element: <SignUp />},
      {path: '/logIn', element: <LogIn />},
      {path: '/userList', element: <UserList />},
      {path: '/teamForm', element: <TeamForm />},
      {path: '/teamInfo/:teamID', element: <TeamInfo />},
      {path: '/teamList', element: <TeamList />}
    ]
  }
])
root.render(
  <RecoilRoot>
    <RouterProvider router={router} />
  </RecoilRoot>
);

reportWebVitals();

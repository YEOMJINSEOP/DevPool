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
import Chat from './components/user/UserInfo/Chat';
import TeamMaker from './components/team/TeamMaker/TeamMaker';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // errorElement: 
    children: [
      {index: true, element: <MainBanner />},
      {path: '/user/info/:userId', element: <UserInfo />},
      {path: '/user/form', element: <UserForm />},
      {path: '/myPage', element: <Mypage />},
      {path: '/signUp', element: <SignUp />},
      {path: '/logIn', element: <LogIn />},
      {path: '/chat', element: <Chat />},
      {path: '/user/list', element: <UserList />},
      {path: '/team/create', element: <TeamForm />},
      {path: '/team/detail/:teamId', element: <TeamInfo />},
      {path: '/team/list', element: <TeamList />},
      {path: '/teamMaker', element: <TeamMaker />}
    ]
  }
])
root.render(
  <RecoilRoot>
    <RouterProvider router={router} />
  </RecoilRoot>
);

reportWebVitals();

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
import Mypage from './components/user/UserInfo/MyPage/Mypage';
import SignUp from './components/user/UserInfo/SignUp/SignUp';
import LogIn from './components/user/UserInfo/LogIn/LogIn';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // errorElement: 
    children: [
      {index: true, element: <MainBanner />},
      {path: '/userInfo', element: <UserInfo />},
      {path: '/myPage', element: <Mypage />},
      {path: '/signUp', element: <SignUp />},
      {path: '/logIn', element: <LogIn />},
      {path: '/team/create', element: <TeamForm />},
      {path: '/team/detail/:teamID', element: <TeamInfo />},
      {path: '/team/list', element: <TeamList />}
    ]
  }
])
root.render(
  <RecoilRoot>
    <RouterProvider router={router} />
  </RecoilRoot>
);

reportWebVitals();

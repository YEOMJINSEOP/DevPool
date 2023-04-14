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
import UserInfo from './components/user/UserInfo/UserInfo';
import Mypage from './components/user/UserInfo/MyPage/Mypage';

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

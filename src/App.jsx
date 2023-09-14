import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
// import MyPage from './pages/MyPage';
import ReservationPage from './pages/ReservationPage';
import Navbar from './components/Navbar';
import WorkSelectPage from './pages/WorkSelectPage';
import DetailSelectPage from './pages/DetailSelectPage';
import BankerSelect from './pages/BankerSelect';
import CustomerMyPage from './pages/mypage/CustomerMyPage';
// import Footer from './components/Footer';

function App() {

  // 현재 경로 갖고오기
  const location = useLocation();

  // 로그인 or 회원가입 페이지에선 네브바 보이지 않음
  const hideNavbar = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <>
      {!hideNavbar && <Navbar/>}
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
        {/* <Route path='/mypage' element={<MyPage/>}/> */}
        <Route path='/reservation' element={<ReservationPage/>}/>
        <Route path='/work-select' element={<WorkSelectPage/>}/>
        <Route path='/detail-select' element={<DetailSelectPage/>}/>
        <Route path='/banker-select' element={<BankerSelect/>}/>
        <Route path='/customer-mypage' element={<CustomerMyPage/>}/>
        
      </Routes>
      {/* <Footer/> */}
    </>
  );
}

export default App;

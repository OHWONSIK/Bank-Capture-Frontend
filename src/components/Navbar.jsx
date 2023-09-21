import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import logo from '../assets/image/logo.png';


function Navbar(props) {

    // 로그인 상태변수 -> 상태관리툴 써서 전역관리 해주자
    const [isLoggedIn, setIsLoggendIn] = useState(true);

    // 로그인 버튼 눌렀을 때
    const handleLogin = () => {
        // 로그인 로직 -> 다른 파일에
        setIsLoggendIn(true);
    };

    // 로그아웃 버튼 눌렀을 때
    const handleLogout = () => {
        // 로그아웃 로직 -> 다른 파일에
        setIsLoggendIn(false);
        // 로그아웃시 sessionStorage 초기화
        sessionStorage.clear();
            navigate('/'); // 로그아웃 후 홈페이지로 이동

    };


    const navigate = useNavigate();

    const moveToMain = () => {
        navigate('/');
    }
    const moveToLogin = () => {
        navigate('/login');
    }
    const isCheckTimePage = window.location.pathname === '/check-time';
    const isReservationPage = window.location.pathname === '/reservation';


    return (
        <Container>
            <Logo onClick={moveToMain}><img src={logo} alt={'로고'}/></Logo>
            <SubContainer>
                {sessionStorage.getItem('bankerId') === null && (
                    <Menu to={isLoggedIn ? (isReservationPage ? '/customer-mypage': '/reservation') : '/login'}>{isReservationPage ? '나의 예약 관리' : '예약하기'}</Menu>
                )}
                {sessionStorage.getItem('bankerId') !== null && (
                    <Menu to={isCheckTimePage ? '/banker-mypage' : '/check-time'}>
                        {isCheckTimePage ? '나의 방문 관리' : '나의 스케줄 관리'}
                    </Menu>
                )}
                <LoginBtn onClick={isLoggedIn ? handleLogout : moveToLogin}>
                    {isLoggedIn ? '로그아웃' : '로그인'}
                </LoginBtn>
            </SubContainer>
        </Container>
    );
}

const Container = styled.div`
    font-size: 24px;
    font-weight: 500;
    /* width: 100vw; */
    height: 120px;
    /* background-color: #ffd500; */
    /* border-bottom: 1px solid #bdb4b4; */
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const SubContainer = styled.div`
    /* background-color: pink; */
    display: flex;
    width: 25vw;
    justify-content: space-between;
    margin-right: 200px;
`;


const Logo = styled.div`
    cursor: pointer;
    margin-left: 100px;

    img {
        width: 350px;
        height: auto;
    }
`;


const Menu = styled(NavLink)`
    text-decoration: none;
    color: #4e5968;
`;

const LoginBtn = styled.div`
    cursor: pointer;
    color: #4e5968;
`;


export default Navbar;
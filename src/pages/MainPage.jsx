import React from 'react';
import { styled, keyframes } from 'styled-components';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as MainImg} from '../assets/image/Group 32.svg';
import MainContent from '../assets/image/MainContent';
import mainiPhone from '../assets/image/mainiphone.png';

function MainPage(props) {
    const navigate = useNavigate();

    const moveToReservation = () => {
        navigate('/reservation'); // 로그인 전역상태관리 통해서 로그인 유무 따라 다르게 렌더링해야됨
    }

    return (
        <>
        <Container>
            <MainImg/>
            <Intro>뱅크캡쳐, <br/> 나와 함께 하는 금융 파트너</Intro>

            <SubIntro>
                내 모든 금융 내역을 한눈에 조회하고 한 곳에서 관리하세요. <br/>
                이제껏 경험 못 했던 쉽고 편리한 금융 서비스, <br/>
                뱅크캡쳐와 함께라면 당신의 일상이 새로워질 거예요.
            </SubIntro>

            <Content>
                <MainContent/>
            </Content>
            
            <Content>
                <img src={mainiPhone} alt={"폰"}/>
            </Content>
            
            <BtnContainer>
                <ReservationBtn onClick={moveToReservation}>예약하러가기</ReservationBtn>
            </BtnContainer>
            
            
        </Container>
        <Footer/>
        </>
    );
}

const Container = styled.div`

`;

const floatAnimation = keyframes`
  0% {
    transform: translate(-50%, -50%);
  }
  50% {
    transform: translate(-50%, -60%);
  }
  100% {
    transform: translate(-50%, -50%);
  }
`;

const Intro = styled.div`
position: absolute;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    font-size: 80px;
    font-weight: 750;
    line-height: 1.5;
    letter-spacing: 3px;
    /* text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); */
    z-index: 1;

    animation: ${floatAnimation} 4s ease-in-out infinite;
`;



const SubIntro = styled.div`
    text-align: center;
    font-size: 40px;
    font-weight: 700;
    line-height: 2;
    padding-top: 300px;
    padding-bottom: 600px;
    background-color: #f9fafb;
`;

const Content = styled.div`
display: flex;
justify-content: center;
margin-top: 100px;
margin-bottom: 200px;
`;


const BtnContainer = styled.div`
background-color: black;
display: flex;
    align-items: center;
    justify-content: center;
`;
const ReservationBtn = styled.div`
    width: 600px;
    margin-top: 200px;
    margin-bottom: 300px;
    height: 90px;
    background-color: #F2B418;
    border-radius: 15px;
    color: black;
    font-size: 35px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

export default MainPage;
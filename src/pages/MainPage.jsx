import React from 'react';
import { styled } from 'styled-components';
// import Swiper from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

function MainPage(props) {
    const navigate = useNavigate();

    const moveToReservation = () => {
        navigate('/reservation'); // 로그인 전역상태관리 통해서 로그인 유무 따라 다르게 렌더링해야됨
    }

    return (
        <>
        <Container>
            <Intro>Welcome to 우리 서비스 어쩌고</Intro>
            <DetailIntro>약간 서비스 한줄소개 느낌</DetailIntro>

            <SwiperContainer
                pagination={{clickable: true}}
                navigation
                modules={[Navigation, Pagination]}
                loop={true}
            >
                <Slide>이미지를 넣든</Slide>
                <Slide>텍스트를 넣든</Slide>
                <Slide>마음대로~</Slide>
            </SwiperContainer>

            <ImgContainer>
                사진 들어갈 자리
            </ImgContainer>
            
            <ReservationBtn onClick={moveToReservation}>예약하러가기</ReservationBtn>
            
            
        </Container>
        <Footer/>
        </>
    );
}

const Container = styled.div`
    text-align: center;
    padding-left: 200px;
    padding-right: 200px;
    padding-top: 200px;

/* height: calc(100vh - 120px); */

    /* overflow-y: scroll;
    &::-webkit-scrollbar {
    display: none;
  } */

/* background-color: pink; */
`;

const Intro = styled.div`
    font-size: 45px;
    font-weight: 700;
    margin-bottom: 20px;
    
`;

const DetailIntro = styled.div`
    font-size: 30px;
    font-weight: 700;
`;

const SwiperContainer = styled(Swiper)`
    margin-top: 100px;
    margin-bottom: 100px;
    height: 500px;
    background-color: lightgray;
`;

const Slide = styled(SwiperSlide)`
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ImgContainer = styled.div`
    height: 500px;
    /* background-color: green; */
    border: 1px solid;
`;

const ReservationBtn = styled.div`
    /* width: 600px; */
    margin-left: 300px;
    margin-right: 300px;
    margin-top: 100px;
    margin-bottom: 200px;
    height: 90px;
    background-color: black;
    border-radius: 10px;
    color: white;
    font-size: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`

export default MainPage;
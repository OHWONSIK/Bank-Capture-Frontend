import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
// import axios from "axios";

function LoginPage(props) {
    const navigate = useNavigate();

    return (
        <Container>
            <Title>로그인</Title>
            <InputWrapper>
                <SubTitle>이메일</SubTitle>
                <Input type="email" placeholder="이메일을 작성해주세요"/>
                <SubTitle>비밀번호</SubTitle>
                <Input type="password" placeholder="비밀번호를 작성해주세요"/>
            </InputWrapper>
            <BtnWrapper>
                <SignupBtn onClick={() => navigate('/signup')}>회원가입</SignupBtn>
                <LoginBtn onClick={() => navigate('/')}>로그인</LoginBtn>
            </BtnWrapper>
        </Container>
    );
}

const Container = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Title = styled.div`
    font-size: 35px;
    font-weight: 700;
`;

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 60px;

`;

const SubTitle = styled.div`
    font-size: 20px;
    font-weight: 700;
`;

const Input = styled.input`
    display: inline-flex;
    width: 400px;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 10px;

    margin-top: 15px;
    margin-bottom: 30px;

    border-radius: 9px;
    border: 1px solid #bdb4b4;
    outline: none;

    font-size: 16px;
    font-weight: 500;

    &::placeholder {
        color: #bdb4b4;
    }
`;

const BtnWrapper = styled.div`
    margin-top: 20px;
    width: 350px;
    display: flex;
    justify-content: space-between;
`;

const SignupBtn = styled.button`
    width: 150px;
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 17px;
    font-weight: 700;
    cursor: pointer;
    background-color: white;
    border: 2px solid black;
    border-radius: 10px;
`;

const LoginBtn = styled.button`
    width: 150px;
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 17px;
    font-weight: 700;
    color: white;
    cursor: pointer;
    background-color: black;
    border: 2px solid black;
    border-radius: 10px;
`;
export default LoginPage;
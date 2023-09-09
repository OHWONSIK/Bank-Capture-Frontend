import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
// import axios from "axios";

function SignupPage(props) {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    // 이메일 형식 체크
    const [emailError, setEmailError] = useState('');

    // 전화번호 형식 체크
    const [phoneNumberError, setPhoneNumberError] = useState('');
    
    // 그 외(이름, 비밀번호) 입력 여부 체크
    const [nameError, setNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    // 이메일 정규식
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    // 이메일 입력값이 변경될 때마다 이메일 형식을 검사하고 에러 메시지 표시
    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);

        if (!emailRegex.test(newEmail)) {
            setEmailError('이메일 형식이 잘못되었습니다.');
        } else {
            setEmailError('');
        }
    };

    // 전화번호 입력값이 변경될 때마다 전화번호 형식을 검사하고 에러 메시지 표시
    const handlePhoneNumberChange = (e) => {
        const newPhoneNumber = e.target.value;

         // 입력값이 11자리를 초과하는 경우 아무 작업도 수행하지 않음
        if (newPhoneNumber.length > 11) {
            return;
        }

        if (!/^\d+$/.test(newPhoneNumber)) {
            setPhoneNumberError('숫자만 입력 가능합니다.');
        } else {
            setPhoneNumberError('');
        }

        setPhoneNumber(newPhoneNumber);
    };

    // 이름, 비밀번호 입력값이 변경될 때
    const handleNameChange = (e) => {
        const newName = e.target.value;
        setName(newName);

        // 이름이 입력되면 에러 메시지 초기화
        setNameError('');
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        // 비밀번호가 입력되면 에러 메시지 초기화
        setPasswordError('');
    };

    // 회원가입 버튼을 눌렀을 때 실행될 함수
    const handleSignup = () => {

        // 이름, 이메일, 비밀번호, 전화번호 중 하나라도 입력되지 않은 경우 에러 메시지 표시
        if (!name || !email || !password || !phoneNumber) {
            if (!name) {
                setNameError('이름을 입력해주세요.');
            }
            if (!email) {
                setEmailError('이메일을 입력해주세요.');
            }
            if (!password) {
                setPasswordError('비밀번호를 입력해주세요.');
            }
            if (!phoneNumber) {
                setPhoneNumberError('전화번호를 입력해주세요.');
            }
            return;
        }

        navigate("/"); // 아래의 통신 코드 작성시엔 지우면 됨

        // axios
        //   .post("백엔드측에서 제시하는 url", {
        //     name,
        //     email,
        //     password,
        //     phoneNumber,
        //   })
        //   .then((response) => {
        //     console.log("회원가입 성공:", response.data);
      
        //     // 회원가입이 성공하면 초기 페이지로 이동합니다.
        //     navigate("/");
        //   })
        //   .catch((error) => {
        //     console.error("회원가입 에러:", error);
        //   });
    };

    return (
        <Container>
            <Title>회원가입</Title>
            <InputWrapper>
                <SubTitle>이름</SubTitle>
                <Input
                    type="text"
                    placeholder="이름을 작성해주세요"
                    onChange={handleNameChange}
                    value={name}
                />
                {nameError && <ErrorMessage>{nameError}</ErrorMessage>}

                <SubTitle>이메일</SubTitle>
                <Input
                    type="email"
                    placeholder="이메일을 작성해주세요"
                    onChange={handleEmailChange}
                    value={email}
                />
                {emailError && <ErrorMessage>{emailError}</ErrorMessage>}

                <SubTitle>비밀번호</SubTitle>
                <Input
                    type="password"
                    placeholder="비밀번호를 작성해주세요"
                    onChange={handlePasswordChange}
                    value={password}
                />
                {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}

                <SubTitle>전화번호</SubTitle>
                <Input
                    type="tel"
                    placeholder="전화번호를 작성해주세요 (띄어쓰기 없이 숫자만 입력)"
                    onChange={handlePhoneNumberChange}
                    value={phoneNumber}
                />
                {phoneNumberError && <ErrorMessage>{phoneNumberError}</ErrorMessage>}
            </InputWrapper>
            <SignupBtn onClick={handleSignup}>회원가입</SignupBtn>
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
    margin-top: 30px;

`;

const SubTitle = styled.div`
    font-size: 20px;
    font-weight: 700;
    margin-top: 30px;
`;

const Input = styled.input`
    display: inline-flex;
    width: 400px;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 10px;

    margin-top: 15px;
    /* margin-bottom: 30px; */

    border-radius: 9px;
    border: 1px solid #bdb4b4;
    outline: none;

    font-size: 16px;
    font-weight: 500;

    &::placeholder {
        color: #bdb4b4;
    }
`;

const SignupBtn = styled.button`
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
    margin-top: 30px;
`;

const ErrorMessage = styled.div`
    color: red;
    font-size: 14px;
    margin-top: 5px;
`;

export default SignupPage;
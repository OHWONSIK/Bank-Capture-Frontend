import React from "react";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import axios from "axios";
import { API } from "../config";
import Swal from "sweetalert2";

/*
로그인 통신코드 
import axios from "axios"; // 필요한 경우 axios 라이브러리를 가져옵니다.

// ...

function LoginPage(props) {
    // ...

    const handleLogin = async () => {
        // 이메일과 비밀번호를 가져옵니다.
        const email = document.querySelector('input[type="email"]').value;
        const password = document.querySelector('input[type="password"]').value;

        // userRole에 따라 다른 AJAX 요청을 보냅니다.
        if (userRole === 'customer') {
            try {
                // Customer 로그인 AJAX 요청
                const response = await axios.post('/customer-login', {
                    email: email,
                    password: password,
                });

                // 성공적으로 로그인한 경우, '/'로 이동
                navigate('/');
            } catch (error) {
                // 오류 처리
                console.error(error);
            }
        } else if (userRole === 'banker') {
            try {
                // Banker 로그인 AJAX 요청
                const response = await axios.post('/banker-login', {
                    email: email,
                    password: password,
                });

                // 성공적으로 로그인한 경우, '/bankermypage'로 이동
                navigate('/banker-mypage');
            } catch (error) {
                // 오류 처리
                console.error(error);
            }
        }
    };

    // ...
return에서 loginbtn onclick시 {handleLogin} 실행

*/

function LoginPage(props) {
    const [userRole, setUserRole] = useState("고객"); // 기본값은 customer로 설정
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // 이메일 형식 체크
    const [emailError, setEmailError] = useState("");
    // 비밀번호 입력 여부 체크
    const [passwordError, setPasswordError] = useState("");

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);

        if (!emailRegex.test(newEmail)) {
            setEmailError("이메일 형식이 잘못되었습니다.");
        } else {
            setEmailError("");
        }
    };

    const handleRoleChange = (role) => {
        setUserRole(role);
    };

    const handleOnKeyPress = (e) => {
        if (e.key === "Enter") {
            handleLogin();
        }
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        // 비밀번호가 입력되면 에러 메시지 초기화
        setPasswordError("");
    };

    const handleLogin = async () => {
        // 이메일과 비밀번호를 가져옵니다.
        // const email = document.querySelector('input[type="email"]').value;
        // const password = document.querySelector('input[type="password"]').value;

        if (!email || !password) {
            if (!email) {
                setEmailError("이메일을 입력해주세요.");
            }
            if (!password) {
                setPasswordError("비밀번호를 입력해주세요.");
            }

            return; // 필수 입력 필드가 비어있으면 함수 실행 중단
        }

        if (!emailRegex.test(email)) {
            setEmailError("이메일 형식이 잘못되었습니다.");
            return;
        }

        // userRole에 따라 다른 AJAX 요청을 보냅니다.
        if (userRole === "고객") {
            try {
                // Customer 로그인 AJAX 요청
                const response = await axios.post(`${API.CUSTOMER_LOGIN}`, {
                    email: email,
                    password: password,
                });
                // 성공적으로 로그인한 경우 sessionStorage에 아이디, 이름 저장
                sessionStorage.setItem("customerId", response.data.customerId);
                sessionStorage.setItem(
                    "customerName",
                    response.data.customerName
                );

                // 성공적으로 로그인한 경우, '/'로 이동
                navigate("/");
            } catch (error) {
                // 오류 처리
                console.error(error);

                // 로그인 실패시 에러메시지 출력
                Swal.fire("로그인 실패", error.response.data.message, "error");
            }
        } else if (userRole === "행원") {
            try {
                // Banker 로그인 AJAX 요청
                const response = await axios.post(`${API.BANKER_LOGIN}`, {
                    email: email,
                    password: password,
                });

                //성공적으로 로그인한 경우 sessionStorage에 아이디, 이름 저장
                sessionStorage.setItem("bankerId", response.data.bankerId);
                sessionStorage.setItem("bankerName", response.data.bankerName);

                // 성공적으로 로그인한 경우, '/bankermypage'로 이동
                navigate("/banker-mypage");
            } catch (error) {
                // 오류 처리
                console.error(error);

                // 로그인 실패시 에러메시지 출력
                Swal.fire("로그인 실패", error.response.data.message, "error");
            }
        }
    };
    const navigate = useNavigate();

    return (
        <Container>
            <Title>로그인</Title>
            <RoleSelector>
                <RoleButton
                    onClick={() => handleRoleChange("고객")}
                    active={userRole === "고객"}
                >
                    고객
                </RoleButton>
                <RoleButton
                    onClick={() => handleRoleChange("행원")}
                    active={userRole === "행원"}
                >
                    행원
                </RoleButton>
            </RoleSelector>
            <InputWrapper>
                <SubTitle>이메일</SubTitle>
                <Input
                    type="email"
                    placeholder="이메일을 작성해주세요"
                    onChange={handleEmailChange}
                    value={email}
                    onKeyPress={handleOnKeyPress}
                />
                {emailError && <ErrorMessage>{emailError}</ErrorMessage>}

                <SubTitle>비밀번호</SubTitle>
                <Input
                    type="password"
                    placeholder="비밀번호를 작성해주세요"
                    onChange={handlePasswordChange}
                    value={password}
                    onKeyPress={handleOnKeyPress}
                />
                {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
            </InputWrapper>
            <BtnWrapper>
                <SignupBtn onClick={() => navigate("/signup")}>
                    회원가입
                </SignupBtn>
                <LoginBtn onClick={handleLogin}>로그인</LoginBtn>
            </BtnWrapper>
        </Container>
    );
}
const ErrorMessage = styled.div`
    color: red;
    font-size: 14px;
    margin-top: 5px;
`;

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

const RoleSelector = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;

const RoleButton = styled.button`
    padding: 10px 20px;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    border: 2px solid black;
    border-radius: 10px;
    background-color: ${(props) => (props.active ? "black" : "white")};
    color: ${(props) => (props.active ? "white" : "black")};
    margin: 0 10px;
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

import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { FiAlertCircle } from "react-icons/fi";
import Swal from "sweetalert2";
import axios from "axios";
import { API } from "../../config";

function DepositForm(props) {

    const navigate = useNavigate();

    const [monthlyIncome, setMonthlyIncome] = useState(""); // 월 소득수준
    const [job, setJob] = useState(""); // 직업군
    const [investjoinFlag, setInvestjoinFlag] = useState(""); // 투자상품 가입 경험
    const [investAmount, setInvestAmount] = useState(""); // 투자 금액
    const [investPeriod, setInvestPeriod] = useState(""); // 투자 기간
    const [targetReturn, setTargetReturn] = useState(""); // 목표수익률
    const [consent, setConsent] = useState(false); // 개인정보활용 동의 항목

    // 입력 여부 체크
    const [monthlyIncomeError, setMonthlyIncomeError] = useState(""); // 월 소득수준
    const [jobError, setJobError] = useState(""); // 직업군
    const [investjoinFlagError, setInvestjoinFlagError] = useState(""); // 투자상품 가입 경험
    const [investAmountError, setInvestAmountError] = useState(""); // 투자 금액
    const [investPeriodError, setInvestPeriodError] = useState(""); // 투자 기간
    const [targetReturnError, setTargetReturnError] = useState(""); // 목표수익률
    const [consentError, setConsentError] = useState(""); // 개인정보활용 동의 항목

    const location = useLocation();
    const bankId = location.state.bankId || "";
    const bankerId = location.state.bankerId || "";
    const reservationDate = location.state.reservationDate || "";
    const reservationTime = location.state.reservationTime || "";
    const reservationId = location.state.reservationId || "";
    const taskId = location.state.taskId || "";
    const bankerName = location.state.bankerName || "";
    const time = location.state.time || "";
    const date = location.state.date || "";

    // date를 원하는 형식으로 변경
    const dateParts = date.split(".");
    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];
    const formattedDate = `${year}년 ${parseInt(month)}월 ${parseInt(day)}일`;

    // time을 원하는 형식으로 변경
    const timeParts = time.split(":");
    let hour = parseInt(timeParts[0]);
    const minute = timeParts[1];
    let ampm = "오전";

    if (hour >= 12) {
        ampm = "오후";
        if (hour > 12) {
            hour -= 12;
        }
    }

    const formattedTime = `${ampm} ${hour}시 ${minute}분`;

    // 최종 문자열 생성
    const formattedDateTime = `${formattedDate} ${formattedTime}`;

    const handleMonthlyIncomeChange = (e) => {
        const newMonthlyIncome = e.target.value;
        setMonthlyIncome(newMonthlyIncome);

        // 입력되면 에러 메시지 초기화
        setMonthlyIncomeError("");
    };

    const handleJobChange = (e) => {
        const newJob = e.target.value;
        setJob(newJob);

        // 입력되면 에러 메시지 초기화
        setJobError("");
    };

    const handleInvestjoinFlagChange = (e) => {
        const newInvestjoinFlag = e.target.value;
        setInvestjoinFlag(newInvestjoinFlag);

        // 입력되면 에러 메시지 초기화
        setInvestjoinFlagError("");
    };

    const handleInvestAmountChange = (e) => {
        const newInvestAmount = e.target.value;
        setInvestAmount(newInvestAmount);

        // 입력되면 에러 메시지 초기화
        setInvestAmountError("");
    };

    const handleInvestPeriodChange = (e) => {
        const newInvestPeriod = e.target.value;
        setInvestPeriod(newInvestPeriod);

        // 입력되면 에러 메시지 초기화
        setInvestPeriodError("");
    };

    const handleTargetReturnChange = (e) => {
        const newTargetReturn = e.target.value;
        setTargetReturn(newTargetReturn);

        // 입력되면 에러 메시지 초기화
        setTargetReturnError("");
    };

    const handleConsentChange = (e) => {
        const newConsent = e.target.checked;
        setConsent(newConsent);

        // 입력되면 에러 메시지 초기화
        setConsentError("");
    };

       // "내용 보기" 버튼 클릭 시 실행되는 함수
       const handleConsentBtnClick = () => {
        // 여기에 링크로 이동하는 코드를 작성합니다.
        window.open("https://chocolate-guppy-308.notion.site/58b2b34f59784aee81af47b69d2c9958?pvs=4", '_blank');
    };

    

    // 폼 제출 버튼 눌렀을 때 실행될 함수
    const handleForm = () => {
        // 하나라도 입력되지 않은 경우 에러 메시지 표시
        if (
            !monthlyIncome ||
            !job ||
            !investjoinFlag ||
            !investAmount ||
            !investPeriod ||
            !targetReturn ||
            !consent
        ) {
            if (!monthlyIncome) {
                setMonthlyIncomeError("월 소득수준을 입력해주세요.");
                return;
            }
            if (!job) {
                setJobError("직업군을 입력해주세요.");
                return;
            }
            if (!investjoinFlag) {
                setInvestjoinFlagError(
                    "투자상품 가입 경험에 대해 선택해주세요."
                );
                return;
            }
            if (!investAmount) {
                setInvestAmountError("투자 금액을 입력해주세요.");
                return;
            }
            if (!investPeriod) {
                setInvestPeriodError("투자 기간을 입력해주세요.");
                return;
            }
            if (!targetReturn) {
                setTargetReturnError("목표수익률을 입력해주세요.");
                return;
            }
            if (!consent) {
                setConsentError("동의해주세요.");
                return;
            }
            return;
        }

        //예약하기 확인
        Swal.fire({
            title: "예약하기",
            text: "정말로 예약하시겠습니까?",
            icon: "info",
            showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
            confirmButtonColor: "black", // confrim 버튼 색깔 지정
            cancelButtonColor: "#696969", // cancel 버튼 색깔 지정
            confirmButtonText: "확인", // confirm 버튼 텍스트 지정
            cancelButtonText: "취소", // cancel 버튼 텍스트 지정
            //reverseButtons: true, // 버튼 순서 거꾸로
        }).then((result) => {
            // 만약 모달창에서 confirm 버튼을 눌렀다면
            if (result.isConfirmed) {
                console.log(bankId);
                console.log(bankerId);
                console.log(reservationDate);
                console.log(reservationId);
                console.log(sessionStorage.getItem("customerId"))
                console.log(reservationTime);
                console.log(taskId);
                axios
                    .post(`${API.RESERVATION_BOOK}`, {
                        bankId: bankId,
                        bankerId: bankerId,
                        customerId: sessionStorage.getItem("customerId"),
                        reservationDate: reservationDate,
                        // reservationFinishFlag: "F",
                        reservationId: reservationId,
                        reservationTime: reservationTime,
                        taskId: taskId,
                    })
                    .then((response) => {
                        console.log("예약 성공:", response.data);

                        //성공이 날라오면 예약완료 확인창 띄워줌
                        Swal.fire({
                            title: "예약완료",
                            text: "확인을 누르시면 마이페이지로 이동합니다.",
                            icon: "success",
                            confirmButtonColor: "#3085d6", // confrim 버튼 색깔 지정
                            confirmButtonText: "확인", // confirm 버튼 텍스트 지정
                        }).then((result) => {
                            // 예약 성공하면 마이 페이지로 이동
                            navigate("/customer-mypage");
                        });
                    })
                    .catch((error) => {
                        alert("예약 에러:", error);
                    });
            }
        });
    };

    return (
        // 방문고객->디비에서 / 상담직원, 방문예약일, 상담내용->다른 페이지에서 물고와야함
        <Container>
            <Title>영업점 방문예약 신청</Title>
            <Table>
                <tbody>
                    <TableRow>
                        <TableHeader>방문고객</TableHeader>
                        <TableCell>
                            <Text>
                                {sessionStorage.getItem("customerName")} 고객님
                            </Text>
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableHeader>상담직원(선택)</TableHeader>
                        <TableCell>
                            <Text>{bankerName} 행원</Text>
                            <Alert>
                                <FiAlertCircle
                                    style={{
                                        color: "#0c90e3",
                                        fontSize: "20px",
                                        marginRight: "5px",
                                    }}
                                />
                                방문영업점 상황에 따라 직원이 변경될 수
                                있습니다.
                            </Alert>
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableHeader>방문예약일</TableHeader>
                        <TableCell>
                            <Text>{formattedDateTime} 예약</Text>
                            <Alert>
                                <FiAlertCircle
                                    style={{
                                        color: "#0c90e3",
                                        fontSize: "20px",
                                        marginRight: "5px",
                                    }}
                                />
                                방문예약은 당일은 불가하며, 다음 영업일 13시부터
                                선택 가능합니다.
                            </Alert>
                            <Alert>
                                <FiAlertCircle
                                    style={{
                                        color: "#0c90e3",
                                        fontSize: "20px",
                                        marginRight: "5px",
                                    }}
                                />
                                먼저 상담중이신 고객님의 응대가 끝나지 않을 경우
                                대기시간이 발생할 수 있으니 양해부탁드립니다.
                            </Alert>
                        </TableCell>
                    </TableRow>
                    <TableRowLast>
                        <TableHeader>상담내용</TableHeader>
                        <TableCell>예금</TableCell>
                    </TableRowLast>
                </tbody>
            </Table>

            <Title>사전서류작성</Title>
            <Table>
                <tbody>
                    <TableRow>
                        <TableHeader>월 소득수준</TableHeader>
                        <TableCellInput>
                            <Input
                                type="text"
                                placeholder="월 소득수준을 입력하세요"
                                onChange={handleMonthlyIncomeChange}
                                value={monthlyIncome}
                            />
                            <Text style={{ marginLeft: "10px" }}>만원</Text>
                        </TableCellInput>
                        {monthlyIncomeError && (
                            <ErrorMessage>{monthlyIncomeError}</ErrorMessage>
                        )}
                    </TableRow>

                    <TableRow>
                        <TableHeader>직업군</TableHeader>
                        <TableCellInput>
                            <Input
                                type="text"
                                placeholder="직업군을 입력하세요"
                                onChange={handleJobChange}
                                value={job}
                            />
                        </TableCellInput>
                        {jobError && <ErrorMessage>{jobError}</ErrorMessage>}
                    </TableRow>

                    <TableRow>
                        <TableHeader>
                            투자상품(펀드, ETF등) 가입 경험
                        </TableHeader>
                        <TableCellInput>
                            <InputCheck
                                type="radio"
                                name="investExperience"
                                value="예"
                                checked={investjoinFlag === "예"}
                                onChange={handleInvestjoinFlagChange}
                            />
                            예
                            <InputCheck
                                type="radio"
                                name="investExperience"
                                value="아니오"
                                checked={investjoinFlag === "아니오"}
                                onChange={handleInvestjoinFlagChange}
                            />
                            아니오
                        </TableCellInput>
                        {investjoinFlagError && (
                            <ErrorMessage>{investjoinFlagError}</ErrorMessage>
                        )}
                    </TableRow>

                    <TableRow>
                        <TableHeader>투자금액</TableHeader>
                        <TableCellInput>
                            <Input
                                type="text"
                                placeholder="원하시는 투자금액을 입력하세요"
                                onChange={handleInvestAmountChange}
                                value={investAmount}
                            />
                            <Text style={{ marginLeft: "10px" }}>만원</Text>
                        </TableCellInput>
                        {investAmountError && (
                            <ErrorMessage>{investAmountError}</ErrorMessage>
                        )}
                    </TableRow>

                    <TableRow>
                        <TableHeader>투자기간</TableHeader>
                        <TableCellInput>
                            <Input
                                type="text"
                                placeholder="투자가능한 기간을 입력하세요"
                                onChange={handleInvestPeriodChange}
                                value={investPeriod}
                            />
                            <Text style={{ marginLeft: "10px" }}>개월</Text>
                        </TableCellInput>
                        {investPeriodError && (
                            <ErrorMessage>{investPeriodError}</ErrorMessage>
                        )}
                    </TableRow>

                    <TableRowLast>
                        <TableHeader>목표수익률</TableHeader>
                        <TableCellInput>
                            <Input
                                type="text"
                                placeholder="원하시는 목표수익률을 입력하세요"
                                onChange={handleTargetReturnChange}
                                value={targetReturn}
                            />
                            <Text style={{ marginLeft: "10px" }}>%</Text>
                        </TableCellInput>
                        {targetReturnError && (
                            <ErrorMessage>{targetReturnError}</ErrorMessage>
                        )}
                    </TableRowLast>
                </tbody>
            </Table>

            <ConsentTable>
                <tbody>
                    <ConsentRow>
                        개인(신용)정보 수집·이용 동의서 (필수) (영업점
                        방문예약(예금))
                        <ConsentBtn onClick={handleConsentBtnClick}>내용 보기</ConsentBtn>
                    </ConsentRow>
                    <ConsentRowLast>
                        <InputCheck
                            type="checkbox"
                            checked={consent}
                            onChange={handleConsentChange}
                        />
                        본인은 귀 행이 개인(신용)정보 수집·이용 동의 상의
                        개인정보 수집 및 이용에 동의합니다.
                        {consentError && (
                            <ConsentErrorMessage>
                                {consentError}
                            </ConsentErrorMessage>
                        )}
                    </ConsentRowLast>
                </tbody>
            </ConsentTable>

            <BtnWrapper>
                <FormBtn onClick={handleForm}>방문예약 신청</FormBtn>
            </BtnWrapper>
        </Container>
    );
}

const Container = styled.div`
    margin-left: 300px;
    margin-right: 300px;
    /* display: flex;
    flex-direction: column; */
    height: calc(100vh - 120px);
    /* border: 1px solid green; */
`;


const ConsentErrorMessage = styled.div`
    color: red;
    font-size: 14px;
    margin-left: auto;
`;

const Title = styled.div`
font-size: 28px;
font-weight: 700;
margin-top: 50px;
margin-bottom: 20px;
`;

const ErrorMessage = styled.div`
    color: red;
    font-size: 14px;
    margin-top: 5px;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
`;

const TableRow = styled.tr`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #b0b0b0;
    
`;

const TableRowLast = styled.tr`
    display: flex;
    justify-content: space-between;
`;

const TableHeader = styled.th`
    width: 300px;
    background-color: #f0f0f0;
    font-weight: bold;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    padding: 20px;
`;

const TableCell = styled.td`
    flex: 1;
    padding: 20px;
    border-left: 1px solid #b0b0b0;
    font-size: 18px;
    display: flex;
    /* justify-content: center; */
    align-items: center;
    flex-direction: column;
    align-items: flex-start;
    line-height: 30px;
`;

const TableCellInput = styled.td`
    flex: 1;
    padding: 20px;
    border-left: 1px solid #b0b0b0;
    font-size: 18px;
    display: flex;
    align-items: center;
    
`;

const Input = styled.input`
    display: inline-flex;
    width: 400px;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 10px;

    border: 1px solid #bdb4b4;
    outline: none;

    font-size: 16px;
    font-weight: 500;

    &::placeholder {
        color: #bdb4b4;
    }
`;

const InputCheck = styled.input`
margin-left: 10px;
margin-right: 10px;
`;

const Text = styled.div`

`;

const Alert = styled.div`
display: flex;
    justify-content: center;
    align-items: center;
`;

const ConsentTable = styled.table`
margin-top: 100px;
margin-bottom: 100px;
width: 100%;
border: 1px solid #b0b0b0; 
    border-collapse: collapse;
    font-size: 20px;
`;

const ConsentRow = styled.tr`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #b0b0b0;
    padding: 20px;
    font-weight: 700;
`;

const ConsentRowLast = styled.tr`
    display: flex;
    padding: 20px;
    align-items: center;

`;

const ConsentBtn = styled.button`
    width: 100px;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    border: 1px solid black;
    background-color: white;
    padding-top: 5px;
    padding-bottom: 5px;
`;

const BtnWrapper = styled.div`
    width:100%;
    text-align: center;
`;

const FormBtn = styled.button`
    width: 200px;
    padding-top: 15px;
    padding-bottom: 15px;
    font-size: 20px;
    font-weight: 500;
    color: white;
    cursor: pointer;
    background-color: black;
    border: 2px solid black;
    border-radius: 10px;
    margin-bottom: 100px;
`;


export default DepositForm;
import React from 'react';
import { styled } from 'styled-components';
import { FiCalendar, FiClock, FiClipboard, FiLink, FiBell } from "react-icons/fi";

function CustomerMyPage(props) {

    // 방문 전 예약 더미데이터
    const beforeVisit = [
        {
            id: 1,
            bank_name: '삼성역 지점',
            bank_addr: '서울시 신사동',
            reservation_date: '2023-09-23',
            reservation_time: '10:00',
            task_name: '예금',
            document_link: 'www.abcdef.gj',
        }
    ];

    // 방문 후 예약 더미데이터
     const afterVisit = [
        {
            id: 1,
            bank_name: '삼성역 지점',
            bank_addr: '서울시 신사동',
            reservation_date: '2023-09-23',
            reservation_time: '10:00',
            task_name: '예금',
            reservation_id: 1,
            comment: '굳~'
        },
        {
            id: 2,
            bank_name: '선릉역 지점',
            bank_addr: '서울시 논현동',
            reservation_date: '2023-09-14',
            reservation_time: '16:00',
            task_name: '개인대출',
            reservation_id: 2,
            comment: ''
        },
        {
            id: 3,
            bank_name: '선릉역 지점',
            bank_addr: '서울시 논현동',
            reservation_date: '2023-08-27',
            reservation_time: '14:00',
            task_name: '적금',
            reservation_id: 3,
            comment: '신동렬 행원 별로입니다'
        },
        {
            id: 4,
            bank_name: '군자역 지점',
            bank_addr: '서울시 능동',
            reservation_date: '2023-07-05',
            reservation_time: '14:00',
            task_name: '적금',
            reservation_id: 4,
            comment: ''
        },
        {
            id: 5,
            bank_name: '선릉역 지점',
            bank_addr: '서울시 논현동',
            reservation_date: '2023-07-03',
            reservation_time: '15:00',
            task_name: '외환',
            reservation_id: 5,
            comment: '친절해여'
        },
    ];
    
    return (
        <Container>
            <SubContainer>
                <LeftContainer>
                    <Box>
                        <NameAndAddr>
                            <BankName>{beforeVisit[0].bank_name}</BankName>
                            <BankAddr>{beforeVisit[0].bank_addr}</BankAddr>
                        </NameAndAddr>
                        
                        <Date><FiCalendar style={{marginRight: '10px'}}/>{beforeVisit[0].reservation_date} 예약</Date>
                        <Time><FiClock style={{marginRight: '10px'}}/>{beforeVisit[0].reservation_time} 예약</Time>
                        <Task><FiClipboard style={{marginRight: '10px'}}/>{beforeVisit[0].task_name}</Task>
                        
                        <Note>
                            <FiBell style={{marginRight: '10px'}}/>필요한 서류의 경우, 아래의 링크를 참고해주세요.
                        </Note>
                        <Document>
                            <FiLink style={{marginRight: '10px'}}/>{beforeVisit[0].document_link}
                        </Document>

                        <BtnContainer>
                            <ChangeBtn>예약 변경</ChangeBtn>
                            <CancelBtn>예약 취소</CancelBtn>
                        </BtnContainer>
                    </Box>
                    
                </LeftContainer>

                <RightContainer>

                </RightContainer>
            </SubContainer>
        </Container>
    );
}

const Container = styled.div`
    margin-left: 150px;
    margin-right: 150px;
    display: flex;
    flex-direction: column;
    height: calc(100vh - 120px);
`;

const SubContainer = styled.div`
    /* flex-grow: 1; */
    /* text-align: center; */
    display: flex;
    padding-top: 50px;
    height: 800px;
    
`;

const LeftContainer = styled.div`
    flex: 1;
    /* border: 1px solid black; */
    margin-right: 20px;
    display: flex;
    justify-content: center;
    align-items: center; 
`;

const RightContainer = styled.div`
    flex: 1;
    border: 1px solid black;
    overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }

`;

const Box = styled.div`
    /* background-color:yellow; */
    border: 1px solid #b0b0b0;
    border-radius: 20px;
    width: 100%;
    padding: 40px;
`;

const NameAndAddr = styled.div`
display: flex;
align-items: center;
margin-bottom: 40px;
`;

const BankName = styled.div`
    font-size: 28px;
    font-weight: 700;
    margin-right: 15px;
`;

const BankAddr = styled.div`
font-size: 20px;
color: #888888;
`;

const Date = styled.div`
font-size: 23px;
display: flex;
align-items: center;
margin-bottom: 20px;
`;

const Time = styled.div`
font-size: 23px;
display: flex;
align-items: center;
margin-bottom: 20px;
`;

const Task = styled.div`
font-size: 23px;
display: flex;
align-items: center;
margin-bottom: 40px;
`;

const Note = styled.div`
   font-size: 23px;
display: flex;
align-items: center; 
margin-bottom: 10px;
`;

const Document = styled.div`
font-size: 23px;
display: flex;
align-items: center;
`;

const BtnContainer = styled.div`
/* background-color: yellow; */
display: flex;
justify-content: center;
`;

const ChangeBtn = styled.button`
    width: 200px;
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 25px;
    font-weight: 700;
    cursor: pointer;
    background-color: white;
    border: 2px solid black;
    border-radius: 10px;
    margin-right: 20px;
    margin-top: 200px;
`;

const CancelBtn = styled.button`
    width: 200px;
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 25px;
    font-weight: 700;
    color: white;
    cursor: pointer;
    background-color: black;
    border: 2px solid black;
    border-radius: 10px;
    margin-top: 200px;
`;
export default CustomerMyPage;
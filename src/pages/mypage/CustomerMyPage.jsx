import React from 'react';
import { styled } from 'styled-components';
import { FiCalendar, FiClock, FiClipboard, FiLink, FiBell, FiEdit3 } from "react-icons/fi";

function groupDataByYearAndMonth(data) {
    const groupedData = {}; // 그룹화된 데이터를 저장할 객체 생성
  
    data.forEach((item) => {
      const date = new Date(item.reservation_date); // 날짜 정보 가져오기
      const year = date.getFullYear(); // 연도 정보 가져오기
      const month = date.getMonth() + 1; // 월 정보를 가져오기. 월은 0부터 시작하므로 1 더함
  
      const key = `${year}년 ${month}월`; // 연도와 월을 조합하여 그룹화 키를 만듭니다.
  
      if (!groupedData[key]) {
        groupedData[key] = [];
      }
  
      groupedData[key].push(item); // 그룹화된 데이터에 해당 아이템 추가
    });
  
    return groupedData;
  }

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
            reservation_date: '2022-09-23',
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
        {
            id: 6,
            bank_name: '선릉역 지점',
            bank_addr: '서울시 논현동',
            reservation_date: '2023-09-03',
            reservation_time: '15:00',
            task_name: '외환',
            reservation_id: 5,
            comment: '친절해여'
        },
    ];

    // 예약 데이터를 현재 날짜를 기준으로 정렬
    const sortedAfterVisit = afterVisit.sort((a, b) => {
        return b.reservation_date.localeCompare(a.reservation_date);
    });

    const groupedData = groupDataByYearAndMonth(sortedAfterVisit);
    
    return (
        <Container>
            <SubContainer>
                <LeftContainer>
                    <Box>
                        <NameAndAddr>
                            <BankName>{beforeVisit[0].bank_name}</BankName>
                            <BankAddr>{beforeVisit[0].bank_addr}</BankAddr>
                        </NameAndAddr>
                        
                        <ADate><FiCalendar style={{marginRight: '10px'}}/>{beforeVisit[0].reservation_date} 예약</ADate>
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
                    {Object.entries(groupedData).map(([key, items]) => (
                        <Wrapper key={key}>
                            <Title>{key} 방문</Title>
                            {items.map((item) => (
                                <SubWrapper key={item.id}>
                                    <DayInfo>
                                        {item.reservation_date.split('-')[2]}
                                    </DayInfo>
                                    <SubInfo>
                                            <NameAndAddr>
                                                <BankName>{item.bank_name}</BankName>
                                                <BankAddr>{item.bank_addr}</BankAddr>
                                            </NameAndAddr>
                                            <Time><FiClock style={{marginRight: '10px'}}/>{item.reservation_time} 예약</Time>
                                            <Task><FiClipboard style={{marginRight: '10px'}}/>{item.task_name}</Task>
                                            
                                                {item.comment ? (
                                                    <Review>{item.comment}</Review>
                                                ) : (
                                                    <ReviewBtn><FiEdit3 style={{marginRight: '10px', color: '#00c154'}}/>리뷰 쓰기</ReviewBtn>
                                                )}
                                            
                                    </SubInfo>
                                </SubWrapper>
                            ))}
                        </Wrapper>
                    ))}
                </RightContainer>
            </SubContainer>
        </Container>
    );
}

const Container = styled.div`
    margin-left: 100px;
    margin-right: 100px;
    display: flex;
    flex-direction: column;
    height: calc(100vh - 120px);
`;

const SubContainer = styled.div`
    /* flex-grow: 1; */
    /* text-align: center; */
    display: flex;
    padding-top: 50px;
    height: 850px;
`;

const LeftContainer = styled.div`
    flex: 1;
    /* border: 1px solid black; */
    margin-right: 100px;
    display: flex;
    justify-content: center;
    align-items: center; 
`;

const RightContainer = styled.div`
    flex: 1;
    /* border: 1px solid black; */
    overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }

`;

const Box = styled.div`
    /* background-color:yellow; */
    border: 1px solid #b0b0b0;
    border-radius: 20px;
    width: 80%;
    padding: 40px;
    margin-top: 30px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16);
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

const ADate = styled.div`
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

const Wrapper = styled.div`

`;

const SubWrapper = styled.div`
display: flex;
    width: 100%;
    margin-bottom: 20px;
`;

const DayInfo = styled.div`
  /* border: 1px solid #b0b0b0; */
  /* width: 10%; */
  font-size: 25px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  padding: 40px;
`;

const SubInfo = styled.div`
width: 70%;
border: 1px solid #b0b0b0;
    border-radius: 20px;
    padding: 40px;
   box-shadow: 0 3px 6px rgba(0,0,0,0.16);

`;

const Title = styled.div`
  font-size: 30px;
    font-weight: 700;
    margin-bottom: 30px;
    margin-top: 50px;
`;

const Review = styled.div`
font-size: 23px;
border-top: 1px solid #b0b0b0;
padding-top: 20px;
`;

const ReviewBtn = styled.div`
display: flex;
align-items: center;
justify-content: center;
border: 1px solid #b0b0b0;
border-radius: 10px;
padding-top: 10px;
    padding-bottom: 10px;
    font-size: 20px;
    font-weight: 700;
    cursor: pointer;
`;

export default CustomerMyPage;
import React from 'react';
import { styled } from 'styled-components';
import { FiCalendar, FiClock, FiClipboard, FiBookmark,FiLink, FiBell, FiEdit3 } from "react-icons/fi";
import kb_img from "../../assets/image/kb_img.png";
import Swal from "sweetalert2";
import { useNavigate, useNavigation } from 'react-router-dom';
import { useState } from 'react';
import ReviewModal from './ReviewPage';
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


function BankerMyPage(props) {

    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

 

    const navigate=useNavigate();

       // 리뷰 작성 버튼을 클릭했을 때 Review 페이지로 이동
       const handleOpenReviewPage = (reservationId) => {
        navigate(`/reviewpage/${reservationId}`); // Review 페이지로 이동하면서 reservationId를 전달합니다.
    };
    function cancelReservation(seq){
        Swal.fire({
            title: '예약을 취소하시겠습니까?',
            text: "취소 시 모든 내역이 삭제됩니다",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'black',
            cancelButtonColor: '#696969',
            cancelButtonText: '뒤로가기',
            confirmButtonText: '취소하기'
          }).then((result) => {
            if (result.isConfirmed) {
                //여기에 비동기 ajax 처리. 
              Swal.fire(
                '취소 완료!',
                '예약이 취소되었습니다.',
                'success',
               
              )
            }
          })
          
    }

                // modifyReservation 함수를 클릭 이벤트 핸들러로 사용
        const modifyReservation = ()=> {
            const reservation_id=unfinishedReservations[0].reservation_id;
            // const reservation_id=unfinishedReservations[0].reservation_id;
            Swal.fire({
            title: '예약을 변경하시겠습니까?',
            text: "변경 시 기존 예약이 변경됩니다",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: 'black',
            cancelButtonColor: '#696969',
            cancelButtonText: '뒤로가기',
            confirmButtonText: '변경하기'
            }).then((result) => {
            if (result.isConfirmed) {
                navigate('/work-select',{state:{reservation_id}});
            }
            });
  }

  
    // 고객 예약 더미데이터
    const Visit = [
        {
            reservation_id: 1,
            reservation_date: '2023-09-23',
            reservation_time: '10:00',
            customer_name:'신동렬',
            task_name: '예금',
            comment: null,
            finish_flag:'T',
            customer_phone:'010-0000-1111'


        },
        {
            reservation_id: 2,
            reservation_date: '2023-09-17',
            reservation_time: '10:00',
            task_name: '개인대출',
            comment: null,
            customer_name:'김두식',  
            finish_flag:'T',
            customer_phone:'010-1000-1111'
           
        },
        {
            reservation_id: 3,
            reservation_date: '2023-09-17',
            reservation_time: '14:00',
            task_name: '적금',
            customer_name:'손흥민',  
            comment: null,
            finish_flag:'F',
            customer_phone:'010-0000-2122'

        },
        {
            reservation_id: 4,
            reservation_date: '2023-09-17',
            reservation_time: '15:00',
            task_name: '예금',
            customer_name:'박소연',  
            comment: null,
            finish_flag:'F',
            customer_phone:'010-0121-2122'

        },
        {
            reservation_id: 5,
            reservation_date: '2023-09-17',
            reservation_time: '16:00',
            task_name: '기업대출',
            customer_name:'봉석이',  
            comment: null,
            finish_flag:'F',
            customer_phone:'010-3333-2122'

        },
        {
            reservation_id: 6,
            reservation_date: '2023-09-17',
            reservation_time: '11:00',
            task_name: '적금',
            customer_name:'손흥민',  
            comment: null,
            finish_flag:'F',
            customer_phone:'010-0000-2122'

        },
        {
            reservation_id: 7,
            reservation_date: '2023-07-05',
            reservation_time: '14:00',
            task_name: '적금',
            comment: '빨리됐어여',
            customer_name: "오원식",
            finish_flag:'T',
            customer_phone:'010-6123-2122'



        },
        {  reservation_id: 8,
            reservation_date: '2023-07-03',
            reservation_time: '14:00',
            task_name: '적금',
            comment: '오늘은 날이 좋았다',
            customer_name: "전민형",
            finish_flag:'T',
            customer_phone:'010-7155-7210'

        },
        {
            reservation_id: 9,
            reservation_date: '2023-07-03',
            reservation_time: '15:00',
            task_name: '외환',
            comment: '',
            banker_name: "송이송",
            finish_flag:'T',
            customer_phone:'010-7225-7210'


        },
        {
            reservation_id: 10,
            reservation_date: '2023-09-03',
            reservation_time: '15:00',
            task_name: '외환',
            comment: '',
            banker_name: "케인",
            finish_flag:'T',
            customer_phone:'010-1125-7210'


        }
    ];

// flag 기준으로 분리. 날짜가 오늘이면서, 방문 전인 고객 
    const unfinishedReservations = Visit.filter((item) => item.finish_flag === 'F');
    const finishedReservations = Visit.filter((item) => item.finish_flag === 'T');


    // 예약 데이터를 현재 날짜를 기준으로 정렬
   const sortedFinishedReservations = finishedReservations.sort((a, b) => {
        return b.reservation_date.localeCompare(a.reservation_date);
    });

    const groupedData = groupDataByYearAndMonth(sortedFinishedReservations);
    const renderUnfinishedReservations = () => {
        
            // 예약 내용을 표시하는 코드 
            return (
                <>
                <NameBankAndBanker>
                <CustomerName>{unfinishedReservations[0].customer_name}</CustomerName>
               
           </NameBankAndBanker>

            
            <ADate><FiCalendar style={{marginRight: '10px'}}/>{unfinishedReservations[0].reservation_date} 예약</ADate>
            <Time><FiClock style={{marginRight: '10px'}}/>{unfinishedReservations[0].reservation_time} 예약</Time>
            <Task><FiClipboard style={{marginRight: '10px'}}/>{unfinishedReservations[0].task_name}</Task>
            <Task><FiClipboard style={{marginRight: '10px'}}/>{unfinishedReservations[0].customer_phone}</Task>
        

            <BtnContainer>
                <ChangeBtn onClick={modifyReservation}>방문 완료</ChangeBtn>
                <CancelBtn onClick={cancelReservation}>예약 취소</CancelBtn>
            </BtnContainer>
            </>
            );
        }
    
    return (
        <Container>
            <SubContainer>
                <LeftContainer>
                    <Box>
                     {renderUnfinishedReservations()}
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
                                            <NameBankAndBanker>
                                             
                                                <CustomerName>{item.customer_name}</CustomerName>
                                               
                                       
                                            </NameBankAndBanker>
                                            <Addr><FiBookmark style={{marginRight: '10px'}}/>{item.bank_addr}</Addr>
                                            <Time><FiClock style={{marginRight: '10px'}}/>{item.reservation_time} 예약</Time>
                                            <Task><FiClipboard style={{marginRight: '10px'}}/>{item.task_name}</Task>
                                            
                                               
                                                    <Review>{item.comment}</Review>
                                               
                            
                                            
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


const NoReservations = styled.div`
    text-align: center;
    font-size: 24px;
    margin-bottom: 20px;
`;

const ReserveButton = styled.button`
    width: 200px;
    padding: 10px;
    font-size: 20px;
    font-weight: 700;
    cursor: pointer;
    background-color: black;
    color: white;
    border: 2px solid black;
    border-radius: 10px;
    margin-top: 20px;
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

const NameBankAndBanker = styled.div`
display: flex;
align-items: center;
margin-bottom: 40px;
`;

const CustomerName = styled.div`
    font-size: 28px;
    font-weight: 700;
    margin-right: 15px;
`;

const BankerName = styled.div`
font-size: 15px;
color: #888888;
font-wieght : 300;
`;



const Addr= styled.div`
font-size: 23px;
display: flex;
align-items: center;
margin-bottom: 20px;
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
margin-bottom: 20px;
`;

const Note = styled.div`
   font-size: 23px;
display: flex;
align-items: center; 
margin-bottom: 20px;
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
    margin-top: 100px;
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
    margin-top: 100px;
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

const Link = styled.a`
  text-decoration: none; /* 밑줄 제거 */
  color: blue; /* 링크 색상 설정 */
  font-size: 23px;
  display: flex;
  align-items: center;
  margin-right: 30px;
  
  &:hover {
    color: red; /* 링크에 마우스를 올렸을 때의 색상 설정 */
  }
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

export default BankerMyPage;
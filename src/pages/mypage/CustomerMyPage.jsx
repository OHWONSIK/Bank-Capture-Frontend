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


function CustomerMyPage(props) {

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

  
    // 방문 전/후 예약 더미데이터
    const Visit = [
        {
            reservation_id: 1,
            bank_name: '삼성역 지점',
            bank_addr: '서울시 신사동',
            reservation_date: '2023-09-23',
            reservation_time: '10:00',
            banker_name:'신동렬',
            task_name: '예금',
            comment: null,
           
            finish_flag:'F'


        },
        {
            reservation_id: 2,
            bank_name: '선릉역 지점',
            bank_addr: '서울시 논현동',
            reservation_date: '2023-09-14',
            reservation_time: '16:00',
            task_name: '개인대출',
            comment: null,
            banker_name: "전민형",
            finish_flag:'T'
           
        },
        {
            reservation_id: 3,
            bank_name: '선릉역 지점',
            bank_addr: '서울시 논현동',
            reservation_date: '2023-08-27',
            reservation_time: '14:00',
            task_name: '적금',
            banker_name: "신동렬",
            comment: '신동렬 행원 별로입니다',
            finish_flag:'T'

        },
        {
            reservation_id: 4,
            bank_name: '군자역 지점',
            bank_addr: '서울시 능동',
            reservation_date: '2023-07-05',
            reservation_time: '14:00',
            task_name: '적금',
            comment: '빨리됐어여',
            banker_name: "오원식",
            finish_flag:'T'


        },
        {  reservation_id: 5,
            bank_name: '군자역 지점',
            bank_addr: '서울시 능동',
            reservation_date: '2023-07-03',
            reservation_time: '14:00',
            task_name: '적금',
            comment: '오늘은 날이 좋았다',
            banker_name: "전민형",
            finish_flag:'T'
        },
        {
            reservation_id: 5,
            bank_name: '선릉역 지점',
            bank_addr: '서울시 논현동',
            reservation_date: '2023-07-03',
            reservation_time: '15:00',
            task_name: '외환',
            comment: '',
            banker_name: "송봉섭",
            finish_flag:'T'

        },
        {
            reservation_id: 6,
            bank_name: '선릉역 지점',
            bank_addr: '서울시 논현동',
            reservation_date: '2023-09-03',
            reservation_time: '15:00',
            task_name: '외환',
            comment: '',
            banker_name: "오원식",
            finish_flag:'T'

        }
    ];

// flag 기준으로 분리
    const unfinishedReservations = Visit.filter((item) => item.finish_flag === 'F');
    const finishedReservations = Visit.filter((item) => item.finish_flag === 'T');


    // 예약 데이터를 현재 날짜를 기준으로 정렬
   const sortedFinishedReservations = finishedReservations.sort((a, b) => {
        return b.reservation_date.localeCompare(a.reservation_date);
    });

    const groupedData = groupDataByYearAndMonth(sortedFinishedReservations);
    const renderUnfinishedReservations = () => {
        if (unfinishedReservations.length === 0) {
            return (
                <NoReservations>
                    방문전 예약내역이 없습니다.<p></p>
                    예약하러 가시겠습니까?<p></p>
                    <ReserveButton onClick={() => navigate('/reservation')}>예약하기</ReserveButton>
                </NoReservations>
            );
        } else {
            // 예약 내용을 표시하는 코드 (기존 코드 복사)
            return (
                <>
                <NameBankAndBanker>
                <BankName>{unfinishedReservations[0].bank_name}</BankName>
                <BankerName>{unfinishedReservations[0].banker_name} 행원</BankerName>
           </NameBankAndBanker>
            <Addr><FiBookmark style={{marginRight: '10px'}}/>{unfinishedReservations[0].bank_addr}</Addr>
            <ADate><FiCalendar style={{marginRight: '10px'}}/>{unfinishedReservations[0].reservation_date} 예약</ADate>
            <Time><FiClock style={{marginRight: '10px'}}/>{unfinishedReservations[0].reservation_time} 예약</Time>
            <Task><FiClipboard style={{marginRight: '10px'}}/>{unfinishedReservations[0].task_name}</Task>
            
            <Note>
                <FiBell style={{marginRight: '10px'}}/>필요 서류의 경우, 아래의 이미지를 클릭해주세요.
            </Note>
            <Document>
            <div style={{marginRight: '210px'}}/>
        <Link href="https://obank.kbstar.com/quics?page=C020003#loading">
         
                 <img src={kb_img}
            alt="kb"  width="200" height="200" align="center" border="0" />

             </Link>  </Document>

            <BtnContainer>
                <ChangeBtn onClick={modifyReservation}>예약 변경</ChangeBtn>
                <CancelBtn onClick={cancelReservation}>예약 취소</CancelBtn>
            </BtnContainer>
            </>
            );
        }
    };
    
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
                                             
                                                <BankName>{item.bank_name}</BankName>
                                                <BankerName>{item.banker_name} 행원</BankerName>
                                       
                                            </NameBankAndBanker>
                                            <Addr><FiBookmark style={{marginRight: '10px'}}/>{item.bank_addr}</Addr>
                                            <Time><FiClock style={{marginRight: '10px'}}/>{item.reservation_time} 예약</Time>
                                            <Task><FiClipboard style={{marginRight: '10px'}}/>{item.task_name}</Task>
                                            
                                                {item.comment  ? (
                                                    <Review>{item.comment}</Review>
                                                ) : (
                                                    <ReviewBtn onClick={() => handleOpenReviewPage(item.reservation_id)}>   
               
                                                  <FiEdit3 style={{marginRight: '10px', color: '#00c154'}}/>리뷰 쓰기</ReviewBtn>
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

const BankName = styled.div`
    font-size: 28px;
    font-weight: 700;
    margin-right: 15px;
`;

const BankerName = styled.div`
font-size: 15px;
color: #888888;
font-weight : 300;
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

export default CustomerMyPage;
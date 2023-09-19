import React from "react";
import { styled } from "styled-components";
import {
    FiClock,
    FiClipboard,
    FiPhone,
} from "react-icons/fi";
import Swal from "sweetalert2";
import { useNavigate, useNavigation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../../config";

function groupDataByYearAndMonth(data) {
    const groupedData = {}; // 그룹화된 데이터를 저장할 객체 생성

    data.forEach((item) => {
        const reservationDate = item.reservationDate; // 날짜 정보 가져오기

        if (reservationDate.length === 8) {
            const year = parseInt(reservationDate.substr(0, 4)); // 연도 정보 가져오기
            const month = parseInt(reservationDate.substr(4, 2)); // 월 정보 가져오기
            const day = parseInt(reservationDate.substr(6, 2)); // 일 정보 가져오기

            if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
                const key = `${year}년 ${month}월`; // 연도와 월을 조합하여 그룹화 키를 만듭니다.

                if (!groupedData[key]) {
                    groupedData[key] = [];
                }

                groupedData[key].push(item); // 그룹화된 데이터에 해당 아이템 추가
            }
        }
    });

    return groupedData;
}

function BankerMyPage(props) {
    //요일 변환
    const getDayOfWeek = (yearStr, monthStr, dayStr) => {
        const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
        const year = parseInt(yearStr);
        const month = parseInt(monthStr) - 1; // 월은 0부터 시작하므로 1을 빼줌
        const day = parseInt(dayStr);

        const date = new Date(year, month, day);

        // Date 객체의 getDay() 메서드를 사용하여 0(일요일)부터 6(토요일)까지의 요일 값을 가져옴
        const dayOfWeek = daysOfWeek[date.getDay()];
        return dayOfWeek;
    };

    //날짜 변환
    const formatDate = (dateStr) => {
        if (dateStr.length === 8) {
            const year = dateStr.substring(0, 4);
            const month = dateStr.substring(4, 6);
            const day = dateStr.substring(6, 8);
            return `${year}.${month}.${day}`;
        }
        return dateStr; // 이미 변환된 날짜는 그대로 반환
    };

    //시간 매핑
    const timeMap = {
        1: 10, // 09:00
        2: 11, // 10:00
        3: 13, // 11:00
        4: 14, // 12:00
        5: 15, // 13:00
        6: 16, // 14:00
        7: 17, // 15:00
    };

    const [Visit, setVisit] = useState([]);
    const [shouldRerender, setShouldRerender] = useState(false); //예약취소했을때 상태변화로 리랜더링하기
    const bankId = 1;
    useEffect(() => {
        
          // Axios를 사용하여 banker_top_3 데이터 가져오기
          axios
            .get(`${API.BANKER_TOP3}`, {
                params: {
                    bankId: 1,
                },
            })
            .then((response) => {                
              // 랭킹 순위의 뱅커이름과 이미지경로 저장
              console.log('banker_top_3 데이터:', response.data);
              const bankerName1 = response.data.content[0].bankerName;
              const bankerImgPath1 = response.data.content[0].bankerImgPath;
              const bankerName2 = response.data.content[1].bankerName;
              const bankerImgPath2 = response.data.content[1].bankerImgPath;
              const bankerName3 = response.data.content[2].bankerName;
              const bankerImgPath3 = response.data.content[2].bankerImgPath;
            
              Swal.fire({
                title: `<div style="margin-bottom: 20px; font-szie :24px"> 이달의 행원</div>`,
                html:
                    `<div style="display: flex; justify-content: space-between;">`+
                    `<div style="flex: 1; margin-right: 10px; text-align: center;">`+
                    `<div style="border-radius: 50%; overflow: hidden; width: 150px; height: 150px; margin: 0 auto;">`+
                    ` <img src="${bankerImgPath1}" alt="Custom image" width="200" height="200 style="object-fit: cover; object-position: center center;">`+
                    `</div>`+
                    `<div style="margin-top: 10px;" >${bankerName1} 행원</div>`+
                    `</div>` +
                    `<div style="flex: 1; margin-right: 10px; text-align: center;">`+
                    ` <div style="border-radius: 50%; overflow: hidden; width: 150px; height: 150px; margin: 0 auto;">`+
                    ` <img src="${bankerImgPath1}" alt="Custom image" width="200" height="200" style="object-fit: cover; object-position: center center;">`+
                    `</div>`+
                    `<div style="margin-top: 10px;">${bankerName2} 행원</div>`+
                    `</div>`+
                    `<div style="flex: 1; margin-right: 10px; text-align: center;">`+
                    ` <div style="border-radius: 50%; overflow: hidden; width: 150px; height: 150px; margin: 0 auto;">`+
                    ` <img src="${bankerImgPath1}" alt="Custom image" width="200" height="200" style="object-fit: cover; object-position: center center;">`+
                    `</div>`+
                    `<div style="margin-top: 10px;">${bankerName3} 행원</div>`+
                    `</div>` +
                    `</div>`,
                width :"800px",
                padding: '3em',
                backdrop: `
                    url(../../../public/logo192.png)
                    rgba(5,5,5,0.2)
                    
                    `
                
                
                

              })
            })
            .catch((error) => {
              // 에러 처리
              console.error('banker_top_3 조회 에러:', error);
            });

        },[shouldRerender]);


    useEffect(() => {

        // 행원Id로 해당 행원 예약조회
        axios
            .get(`${API.BANKER_SCHEDULE_INQUIRY}`, {
                params: {
                    bankerId: 1,
                },
            })
            .then((response) => {
                setVisit(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error("조회 에러:", error);
            });
    }, [shouldRerender]); // 랜더링 상태가 바뀔때마다 새로 조회함

    const navigate = useNavigate();

    function cancelReservation(reservationId) {
        Swal.fire({
            title: "예약을 취소하시겠습니까?",
            text: "취소 시 모든 내역이 삭제됩니다",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "black",
            cancelButtonColor: "#696969",
            cancelButtonText: "뒤로가기",
            confirmButtonText: "취소하기",
        }).then((result) => {
            if (result.isConfirmed) {
                //여기에 비동기 ajax 처리.

                axios
                    .post(`${API.RESERVATION_CANCEL}`, {
                        reservationId: reservationId,
                    })
                    .then((response) => {
                        console.log("예약취소 성공:", response.data);

                        Swal.fire({
                            title: "취소완료",
                            text: "예약이 취소되었습니다.",
                            icon: "success",
                            confirmButtonColor: "#3085d6",
                            confirmButtonText: "확인",
                        }).then((result) => {
                            // 취소 성공하면 다시 랜더링해서 방문전 예약 없어진거 표시
                            setShouldRerender(!shouldRerender);
                        });
                    })
                    .catch((error) => {
                        console.error("예약취소 에러:", error);
                    });
            }
        });
    }

    // modifyReservation 함수를 클릭 이벤트 핸들러로 사용
    const checkFlag = (reservationId) => {

        Swal.fire({
            title: '해당 예약을 방문완료로 변경하시겠습니까 ?',
            text: "변경 시 고객에게 방문완료 안내 문자가 발송됩니다. ",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "black",
            cancelButtonColor: "#696969",
            cancelButtonText: "뒤로가기",
            confirmButtonText: "변경하기",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .post(`${API.SCHEDULE_DONE}`, {
                        reservationId : reservationId,
                    })
                    .then((response) => {
                        console.log("예약취소 성공:", response.data);

                        Swal.fire({
                            title: "변경완료",
                            text: "예약이  방문완료로 변경되었습니다..",
                            icon: "success",
                            confirmButtonColor: "#3085d6",
                            confirmButtonText: "확인",
                        }).then((result) => {
                            // 취소 성공하면 다시 랜더링해서 방문전 예약 없어진거 표시
                            setShouldRerender(!shouldRerender);
                        });
                    })
                    .catch((error) => {
                        console.error("예약취소 에러:", error);
                    });
            }
        });
    };


    // flag 기준으로 분리
    const unfinishedReservations = Visit.filter(
        (item) => item.finishFlag === "F"
    );
    const finishedReservations = Visit.filter(
        (item) => item.finishFlag === "T"
    );

    // 예약 데이터를 현재 날짜를 기준으로 정렬
    const sortedFinishedReservations = finishedReservations.sort((a, b) => {
        return b.reservationDate.localeCompare(a.reservationDate);
    });
    const sortedUnFinishedReservations = unfinishedReservations.sort((a, b) => {
        return b.reservationDate.localeCompare(a.reservationDate);
    });

    const groupedDataFin = groupDataByYearAndMonth(sortedFinishedReservations);
    const groupedDataUnFin = groupDataByYearAndMonth(sortedUnFinishedReservations);
    const renderUnfinishedReservations = () => {
        if (unfinishedReservations.length === 0) {
            return (
                <NoReservations>
                    방문전 예약내역이 없습니다.<p></p>

                </NoReservations>
            );
        } else {
            //시간 매핑
            const hour = timeMap[unfinishedReservations[0].reservationTime];
            const formattedTime = `${hour}:00`;
            

            return (
                <>
                    {Object.entries(groupedDataUnFin).map(([key, items]) => (
                        <Wrapper key={key}>
                            <Title>{key} 방문</Title>
                            {items.map((item) => (
                                <SubWrapper key={item.id}>
                                    <DayInfo>
                                        {/* 일만 표기 */}
                                        {item.reservationDate.substring(6, 8)}
                                        {/* 한칸 띄우고 변환한 요일 표기 */}
                                        <br />
                                        {getDayOfWeek(
                                            item.reservationDate.substring(0,4),
                                            item.reservationDate.substring(4,6),
                                            item.reservationDate.substring(6, 8)
                                        )}
                                    </DayInfo>
                                    <SubInfo>
                                            <NameCustomer>
                                             
                                                <CustomerName>{item.customerName} 고객</CustomerName>
                                       
                                            </NameCustomer>
                                            
                                            
                                            <Time>
                                                <FiClock style={{ marginRight: "10px" }} />
                                                {/* 변환한 시간 표기 */}
                                                {timeMap[item.reservationTime]}:00 예약
                                            </Time>
                                            <Task><FiClipboard style={{marginRight: '10px'}}/>{item.taskName}</Task>
                                            <Phone><FiPhone style={{marginRight: '10px'}}/>{item.customerPhone}</Phone>
                                            
                                            <BtnContainer>
                                                <CheckBtn onClick={()=> checkFlag(item.reservationId)}>방문 완료</CheckBtn>
                                                <CancelBtn onClick={()=> cancelReservation(item.reservationId)}>예약 취소</CancelBtn>
                                            </BtnContainer>
                                                              
                                    </SubInfo>
                                </SubWrapper>
                            ))}
                        </Wrapper>
                    ))}
                </>
            );
        }
    };

    return (
        <Container>
            <SubContainer>
                <LeftContainer>
                    {renderUnfinishedReservations()}
                </LeftContainer>

                <RightContainer>
                    {Object.entries(groupedDataFin).map(([key, items]) => (
                        <Wrapper key={key}>
                            <Title>{key} 방문</Title>
                            {items.map((item) => (
                                <SubWrapper key={item.id}>
                                    <DayInfo>
                                        {/* 일만 표기 */}
                                        {item.reservationDate.substring(6, 8)}
                                        {/* 한칸 띄우고 변환한 요일 표기 */}
                                        <br />
                                        {getDayOfWeek(
                                            item.reservationDate.substring(0,4),
                                            item.reservationDate.substring(4,6),
                                            item.reservationDate.substring(6, 8)
                                        )}
                                    </DayInfo>
                                    <SubInfo>
                                            <NameCustomer>
                                             
                                                <CustomerName>{item.customerName} 고객</CustomerName>
                                       
                                            </NameCustomer>
                                            <Time><FiClock style={{marginRight: '10px'}}/>{item.reservationTime}:00 예약</Time>
                                            <Task><FiClipboard style={{marginRight: '10px'}}/>{item.taskName}</Task>
                                            <Phone><FiPhone style={{marginRight: '10px'}}/>{item.customerPhone}</Phone>
                                            {item.bankerReviewComment ? (
                                            <Review>
                                                {item.bankerReviewComment}
                                            </Review>
                                        ) : (
                                            ""
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
overflow-y: scroll;
&::-webkit-scrollbar {
    display: none;
}
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
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
`;

const NameCustomer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 40px;
`;

const CustomerName = styled.div`
    font-size: 28px;
    font-weight: 700;
    margin-right: 15px;
`;

const Addr = styled.div`
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

const Phone = styled.div`
font-size: 23px;
display: flex;
align-items: center;
margin-bottom: 20px;
`;


const BtnContainer = styled.div`
    /* background-color: yellow; */
    display: flex;
    justify-content: center;
`;

const CheckBtn = styled.button`
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

const Wrapper = styled.div``;

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
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
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
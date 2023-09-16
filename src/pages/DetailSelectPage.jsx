import React, { useEffect, useState } from "react";
import { styled } from "styled-components";

import ReserveDate from "../components/ReserveDate";
import ReserveTime from "../components/ReserveTime";
import { useLocation, useNavigate } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { BiSolidComment } from "react-icons/bi";
import moment from "moment";
import Swal from "sweetalert2";

function DetailSelectPage(props) {
    const [selectedDate, setSelectedDate] = useState(""); // 선택한 날짜
    const [selectedTime, setSelectedTime] = useState(""); // 선택한 시간
    const [isReserveActive, setIsReserveActive] = useState(false); // 예약이 활성화되었는지 여부
    
    const location = useLocation();

    const taskId = location.state.taskId; //예약하기를 위해 필요한 업무ID
    const selectedBankers = location.state.selectedBankers || []; //지점, 업무에 맞는 모든 행원들
    
    const [filteredBankers, setFilteredBankers] = useState(selectedBankers);

    const handleTimeSelection = (time) => {
        setSelectedTime(time);
        setIsReserveActive(true); // 시간 선택 시 예약 활성화

        //시간 매핑 함수
        const getTimeSlot = (time) => {
            switch (time) {
                case "10:00":
                    return 1;
                case "11:00":
                    return 2;
                case "13:00":
                    return 3;
                case "14:00":
                    return 4;
                case "15:00":
                    return 5;
                case "16:00":
                    return 6;
                case "17:00":
                    return 7;
                default:
                    return 0; // 일치하는 시간 슬롯이 없을 경우
            }
        };

        const filtered = selectedBankers.filter((banker) => {
            const scheduleForDate = banker.scheduleList.find((schedule) => {
                return (
                    schedule.scheduleDate ===
                    moment(selectedDate).format("YYYYMMDD")
                );
            });

            if (scheduleForDate) {
                // 선택한 시간에 대한 예약 가능 여부 확인
                const selectedTimeKey = `time${getTimeSlot(time)}`;
                return scheduleForDate[selectedTimeKey] === 1;
            }

            return false; 
        });

        setFilteredBankers(filtered);

        // 예약 가능한 행원이 없을 때 알림창 띄우기
        if (filtered.length === 0) {
            Swal.fire(
                "예약 가능한 행원이 없습니다.",
                "다른 시간을 선택하세요.",
                "error"
            );
        }
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setSelectedTime(""); // 날짜가 변경되면 시간 선택 초기화
        setIsReserveActive(false); // 날짜 선택 시 예약 비활성화

        const filtered = selectedBankers.filter((banker) => {
            const scheduleForDate = banker.scheduleList.find((schedule) => {
                return (
                    schedule.scheduleDate === moment(date).format("YYYYMMDD")
                );
            });

            if (scheduleForDate) {
                // 선택한 날짜에 예약이 가능한 행원들 표시
                return scheduleForDate;
            }

            return false;
        });

        setFilteredBankers(filtered);

        // 예약 가능한 행원이 없을 때 알림창 띄우기
        if (filtered.length === 0) {
            Swal.fire(
                "예약 가능한 행원이 없습니다.",
                "다른 날짜를 선택하세요.",
                "error"
            );
        }
    };

    const navigate = useNavigate();

    const moveToBankerSelect = (selectedBankerId) => {
        if (!isReserveActive) {
            Swal.fire(
                "시간이 선택되지 않았습니다",
                "원하는 시간을 선택해주세요",
                "error"
            );
            return;
        }
        const selectedBanker = selectedBankers.find(
            (banker) => banker.bankerId === selectedBankerId
        );
        if (selectedBanker) {
            
            //캘린더 라이브러리 클릭시 선택되는 날짜포맷을 YYYYMMDD형식으로 변경해서 저장
            let reservationDate = moment(selectedDate).format("YYYYMMDD");

            const times = ['10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00']
            
            let reservationTime; //reservationTime 매핑을 위한 변수선언

                for (let i = 0; i < times.length; i++) {
                    if (times[i] === selectedTime) {
                        reservationTime = i + 1; // taskId는 1부터 시작하므로 +1
                        break; //reservationId를 찾으면 루프를 중단합니다.
                    }
                }
            
            //행원의 스케줄리스트에 bankId가 있기때문에 가져와서 저장
            //나중에 지점선택할때부터 bankId물고오는걸로 수정해야함
            const bankId = selectedBanker.scheduleList[0].bankId;
            
            navigate("/banker-select", {
                state: {
                    selectedBanker,
                    reservationDate,
                    reservationTime,
                    bankId: bankId,
                    taskId,
                },
            });
        }
    };
    //console.log("filteredBankers:", filteredBankers);

    // 예제 2: ReserveDate 컴포넌트에서 선택한 날짜를 콘솔에 출력
    //console.log("selectedDate:", selectedDate);

    //console.log("selectedBankerList", selectedBankers);
    // 예제 3: ReserveTime 컴포넌트에서 선택한 시간을 콘솔에 출력
    //console.log("selectedTime:", selectedTime);
    return (
        <Container>
            <SubContainer>
                <LeftContainer>
                    <DateSelect>날짜 선택</DateSelect>
                    <ReserveDate
                        selectedDate={selectedDate}
                        setSelectedDate={handleDateChange}
                    />

                    <TimeSelect>시간 선택</TimeSelect>
                    <ReserveTime
                        selectedTime={selectedTime}
                        setSelectedTime={handleTimeSelection}
                    />
                </LeftContainer>

                <RightContainer>
                    {filteredBankers.map((banker, i) => (
                        <BankerInfo
                            key={i}
                            onClick={() => moveToBankerSelect(banker.bankerId)}
                        >
                            <Profile
                                src={banker.bankerImgPath}
                                alt={"프로필 이미지"}
                            ></Profile>
                            <Text>
                                <Name>행원 {banker.bankerName}</Name>
                                <PrAndCareer>
                                    <Pr>{banker.bankerInfo}</Pr>
                                    <Career>({banker.bankerCareer})</Career>
                                </PrAndCareer>
                                <RatingAndComment>
                                    <Rating>
                                        <AiFillStar
                                            style={{ marginRight: "5px" }}
                                        />
                                        {banker.bankerAvgStar}
                                    </Rating>
                                    <Comment>
                                        <BiSolidComment
                                            style={{ marginRight: "5px" }}
                                        />
                                        {banker.bankerCommentCnt}
                                    </Comment>
                                </RatingAndComment>
                            </Text>
                        </BankerInfo>
                    ))}
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
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const RightContainer = styled.div`
    flex: 1;
    /* border: 1px solid black; */
    overflow-y: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const DateSelect = styled.div`
    font-size: 28px;
    font-weight: 700;
    width: 700px;
    padding-bottom: 10px;
    margin-bottom: 20px;
    border-bottom: 2px solid lightgray;
    padding-left: 20px;
`;

const TimeSelect = styled.div`
    font-size: 28px;
    font-weight: 700;
    width: 700px;
    padding-bottom: 10px;
    margin-bottom: 20px;
    border-bottom: 2px solid lightgray;
    padding-left: 20px;
`;

const SelectBtn = styled.button`
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
    margin-top: 50px;
`;
const BankerInfo = styled.div`
    display: flex;
    align-items: center;
    padding: 40px;
    border-bottom: 1px solid lightgray;
    cursor: pointer;
`;

const Text = styled.div`
    flex: 1;

    margin-left: 20px;
    line-height: 30px;
`;

const Profile = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50px;
`;

const Name = styled.div`
    font-size: 24px;
    font-weight: bold;
`;

const PrAndCareer = styled.div`
    display: flex;
    align-items: center;
`;

const Pr = styled.div`
    font-size: 18px;
`;

const Career = styled.div`
    font-size: 18px;
    margin-left: 5px;
`;

const RatingAndComment = styled.div`
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 18px;
    /* margin-top: 5px; */
`;

const Rating = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Comment = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
export default DetailSelectPage;

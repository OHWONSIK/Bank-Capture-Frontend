import React, { useEffect, useState } from "react";
import { styled } from "styled-components";

import ScheduleDate from "../../components/ScheduleDate";
import ScheduleTime from "../../components/ScheduleTime";
import { useLocation, useNavigate } from "react-router-dom";
import { FiCalendar } from "react-icons/fi";
import moment from "moment";
import Swal from "sweetalert2";
import { API } from "../../config";
import axios from "axios";


function CheckTimePage(props) {
    const [selectedDate, setSelectedDate] = useState(""); // 선택한 날짜
    const [selectedTime, setSelectedTime] = useState([]); // 선택한 시간
    const [isReserveActive, setIsReserveActive] = useState(false); // 예약이 활성화되었는지 여부
    
    const bankerId = sessionStorage.getItem('bankerId');

    


    //시간매핑 배열
    const times = ["10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

    //시간변환 함수
    const getTimeSlot = (time) => {
        const index = times.indexOf(time);
        return index !== -1 ? index + 1 : 0;
    };

    const handleTimeSelection = (time) => {
        setSelectedTime(time);
        setIsReserveActive(true); // 시간 선택 시 예약 활성화
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setSelectedTime([]); // 날짜가 변경되면 시간 선택 초기화
        setIsReserveActive(false); // 날짜 선택 시 예약 비활성화

        
    };

    const navigate = useNavigate();

    

    function saveSchedule() {
        Swal.fire({
            title: "스케줄을 저장하시겠습니까?",
            text: "선택한 시간은 예약가능한 시간으로 표시됩니다.",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "black",
            cancelButtonColor: "#696969",
            cancelButtonText: "뒤로가기",
            confirmButtonText: "저장하기",
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(selectedTime);
                const selectionStatusArray = times.map((time) =>
                selectedTime.includes(time) ? 1 : 0);

            console.log(selectionStatusArray);
                let scheduleDate = moment(selectedDate).format("YYYYMMDD");
                console.log(scheduleDate);
                axios
                    .post(`${API.SCHEDULE_INSERT}`, {
                        bankerId: bankerId,
                        bankId:1,
                        scheduleDate: scheduleDate,
                        time1:selectionStatusArray[0],
                        time2:selectionStatusArray[1],
                        time3:selectionStatusArray[2],
                        time4:selectionStatusArray[3],
                        time5:selectionStatusArray[4],
                        time6:selectionStatusArray[5],
                        time7:selectionStatusArray[6],
                    })
                    
                    .then((response) => {
                        console.log("스케줄 저장 성공:", response.data);

                        Swal.fire({
                            title: "저장완료",
                            text: "스케줄이 저장되었습니다.",
                            icon: "success",
                            confirmButtonColor: "#3085d6",
                            confirmButtonText: "확인",
                        });
                    })
                    .catch((error) => {
                        console.error("스케줄 저장 에러:", error);
                    });
            }
        });
    }

    return (
        <Container>
            <SubContainer>
                <LeftContainer>
                    <DateSelect>날짜 선택</DateSelect>
                    <ScheduleDate
                        selectedDate={selectedDate}
                        setSelectedDate={handleDateChange}
                    />

                    <TimeSelect>시간 선택</TimeSelect>
                    <ScheduleTime
                        selectedTime={selectedTime}
                        setSelectedTime={handleTimeSelection}
                    />
                    <ReviewBtn 
                        onClick={() =>
                            saveSchedule()}>
                                <FiCalendar
                                style={{
                                    marginRight: "10px",
                                    color: "#00c154",
                                }}/>
                                 스케줄 저장
                    </ReviewBtn>

                </LeftContainer>
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
const ReviewBtn = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #b0b0b0;
    border-radius: 10px;
    margin-top :15px;
    margin-bottom :40px;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 20px;
    font-weight: 700;
    cursor: pointer;
`;
export default CheckTimePage;

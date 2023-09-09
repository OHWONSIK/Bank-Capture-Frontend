import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';

import ReserveDate from '../components/ReserveDate';
import ReserveTime from '../components/ReserveTime';
import { useLocation, useNavigate } from 'react-router-dom';
import { AiFillStar } from "react-icons/ai";
import { BiSolidComment } from "react-icons/bi";
import moment from 'moment';
// import { axios } from 'axios';


function DetailSelectPage(props) {
    const [selectedDate, setSelectedDate] = useState(new Date()); // 선택한 날짜
    const [selectedTime, setSelectedTime] = useState(""); // 선택한 시간

    const location = useLocation();
    const selectedBankers = location.state.selectedBankers || [];

    // 시간&&날짜 만족하는 은행원 박스만 활성화시키는 코드 작성해야함
    // const [selectedDate, setSelectedDate] = useState(new Date());
    // const [selectedTime, setSelectedTime] = useState("");

    // useEffect(() => {
    //     fetchBankerInfo(selectedDate, selectedTime);
    // }, [selectedDate, selectedTime]);

    // const fetchBankerInfo = (date, time) => {
    //     axios.get('', {
    //         params: {date, time,},
    //     })
    //     .then(res => {
            
    //     })
    // }
// 주요 페이지 컴포넌트 내에서
const filteredBankers = selectedBankers.filter(banker => {
    // 해당 날짜와 시간에 은행원의 일정이 있는지 확인
    const hasSchedule = banker.schedule_list.some(schedule => {
        const scheduleDate = new Date(schedule.date);
        const scheduleTime = schedule.time;
        console.log(schedule.date.includes(selectedDate.toISOString().slice(0, 10)))
                // 선택한 날짜와 스케줄 날짜가 같고, 선택한 시간이 스케줄 시간에 포함되는지 확인
        return schedule.date.includes(selectedDate.toISOString().slice(0, 10)) &&
            scheduleTime.includes(selectedTime);
    });

    return hasSchedule;
});


    const navigate = useNavigate();

    const moveToBankerSelect = (selectedBankerId) => {

        const selectedBanker = selectedBankers.find(banker =>
            banker.id === selectedBankerId);
        if (selectedBanker) {
            navigate('/banker-select', {state: {selectedBanker}});
        }
    }
    console.log("filteredBankers:", filteredBankers);

    // 예제 2: ReserveDate 컴포넌트에서 선택한 날짜를 콘솔에 출력
    console.log("selectedDate:", selectedDate);
    
    console.log("selectedBankerList",selectedBankers);
    // 예제 3: ReserveTime 컴포넌트에서 선택한 시간을 콘솔에 출력
    console.log("selectedTime:", selectedTime);
    return (
        <Container>
            <SubContainer>
                <LeftContainer>
                    <DateSelect>날짜 선택</DateSelect>
                    <ReserveDate selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

                    <TimeSelect>시간 선택</TimeSelect>
                    <ReserveTime selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
                </LeftContainer>

                <RightContainer>
                    {selectedBankers.map((banker, i) => (
                        <BankerInfo key={i} onClick={() =>moveToBankerSelect(banker.id)}>
                            <Profile src={banker.banker_imgepath} alt={"프로필 이미지"}></Profile>
                            <Text>
                                <Name>행원 {banker.banker_name}</Name>
                                <PrAndCareer>
                                    <Pr>{banker.banker_info}</Pr>
                                    <Career>({banker.banker_career})</Career>
                                </PrAndCareer>
                                <RatingAndComment>
                                    <Rating><AiFillStar style={{marginRight : "5px"}}/>{banker.banker_avg_star.toFixed(1)}</Rating>
                                    <Comment><BiSolidComment style={{marginRight : "5px"}}/>{banker.banker_cnt_comment}</Comment>
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
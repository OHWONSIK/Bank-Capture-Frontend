import React, { useState } from 'react';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import cover1 from "../assets/image/cover1.png";
import cover2 from "../assets/image/cover2.png";
import cover3 from "../assets/image/cover3.png";
import cover4 from "../assets/image/cover4.png";

function WorkSelectPage(props) {

    // 은행원 더미데이터
    const bankerAll = [
        {
          id: 1,
          banker_imgepath: cover1,
          banker_name: '신동렬',
          banker_career: '3년',
          banker_task: ['투자', '예금', '적금'],
          banker_avg_star: 4.9,
          banker_cnt_comment: 2,
          banker_info: '감사합니다. 잘 부탁드립니다~',
          schedule_list:[
            {
                    date: "2023-09-11",
                    time: ['9:00','10:00','11:00']
                    }, 
                    {
                    date: "2023-09-13",
                    time: ['9:00','10:00','14:00']
                    }
               ],
        },
        {
          id: 2,
          banker_imgepath: cover2,
          banker_name: '송봉섭',
          banker_career: '2년',
          banker_task: ['투자', '기업대출', '예금', '적금'],
          banker_avg_star: 4.0,
          banker_cnt_comment: 2,
          banker_info: '한줄소개입니다',
          schedule_list:[
            {
                    date: "2023-09-11",
                    time: ['9:00','10:00','11:00','14:00']
                    }, 
                    {
                    date: "2023-09-13",
                    time: ['10:00','11:00','14:00'],
                    }
               ],

        },
        {
          id: 3,
          banker_imgepath: cover3,
          banker_name: '전민형',
          banker_career: '2년',
          banker_task: ['개인대출', '기업대출'],
          banker_avg_star: 4.9,
          banker_cnt_comment: 0,
          banker_info: '잘 부탁드립니다다당',
          schedule_list:[
            {
                    date: "2023-09-12",
                    time: ['10:00','11:00','14:00'],
                    }, 
                    {
                    date: "2023-09-13",
                    time: ['10:00','11:00']
                    }
               ],
        },
        {
            id: 4,
            banker_imgepath: cover4,
            banker_name: '오원식',
            banker_career: '3년',
            banker_task: ['자산', '적금'],
            banker_avg_star: 3.7,
            banker_cnt_comment: 4,
            banker_info: '감사합니다. 잘 부탁드립니다!',
            schedule_list:[
                {
                        date: "2023-09-11",
                        time: ['11:00']
                        }, 
                        {
                        date: "2023-09-13",
                        time: ['10:00','11:00','14:00']
                        },
                        {
                            date: "2023-09-15",
                            time: ['10:00','14:00','15:00','16:00']
                            }
                   ],
          },
           {
            id: 5,
            banker_imgepath: cover4,
            banker_name: '오원식',
            banker_career: '3년',
            banker_task: ['자산', '적금'],
            banker_avg_star: 3.7,
            banker_cnt_comment: 4,
            banker_info: '감사합니다. 잘 부탁드립니다!',
            schedule_list:[
                        {
                        date: "2023-09-13",
                        time: ['14:00','15:00','16:00']
                        },
                        {
                            date: "2023-09-15",
                            time: ['10:00','11:00','13:00','16:00']
                            }
                   ],
          },
           {
            id: 6,
            banker_imgepath: cover4,
            banker_name: '오원식',
            banker_career: '3년',
            banker_task: ['자산', '적금'],
            banker_avg_star: 3.7,
            banker_cnt_comment: 4,
            banker_info: '감사합니다. 잘 부탁드립니다!',
            schedule_list:[
                {
                date: "2023-09-14",
                time: ['10:00','13:00','16:00']
                },
                {
                    date: "2023-09-15",
                    time: ['13:00','16:00']
                    }
           ],
          },
           {
            id: 7,
            banker_imgepath: cover4,
            banker_name: '오원식',
            banker_career: '3년',
            banker_task: ['자산', '적금'],
            banker_avg_star: 3.7,
            banker_cnt_comment: 4,
            banker_info: '감사합니다. 잘 부탁드립니다!',
            schedule_list:[
                {
                date: "2023-09-14",
                time: ['13:00','16:00']
                },
                {
                    date: "2023-09-15",
                    time: ['10:00','13:00','16:00']
                    },
                    {
                        date: "2023-09-16",
                        time: ['10:00','13:00','14:00']
                        }

           ],
          },
           {
            id: 8,
            banker_imgepath: cover4,
            banker_name: '오원식',
            banker_career: '3년',
            banker_task: ['자산', '적금'],
            banker_avg_star: 3.7,
            banker_cnt_comment: 4,
            banker_info: '감사합니다. 잘 부탁드립니다!',
            schedule_list:[
                {
                date: "2023-09-14",
                time: ['10:00','13:00']
                },
                {
                    date: "2023-09-15",
                    time: ['10:00']
                    },
                    {
                        date: "2023-09-17",
                        time: ['11:00','13:00','15:00']
                        }

           ],
          },
        
    ];

    // 은행업무
    const works = ['예금', '적금', '개인대출', '자산', '외환', '기업대출'];

    const [selectedWork, setSelectedWork] = useState("");

    const [isHovered, setIsHovered] = useState(false);
    const handleMouseEnter = () => {
        setIsHovered(true);
      };
    
      const handleMouseLeave = () => {
        setIsHovered(false);
      };

    const handleSelectedWork = (banker_task) => {
        setSelectedWork(banker_task);
    };

    const navigate = useNavigate();

    const moveToDetailSelect = () => {
        //여기서 axios 통신으로 백단에다 지점, 업무 ID 보내주고 
        //백에서는 쿼리로 해당하는 행원 SELECT 후 RESPONSE로 해당하는 행원들 정보 반환. 
        if (selectedWork) {
            // 선택한 업무와 일치하는 은행원 정보 필터링
            const selectedBankers = bankerAll.filter(banker =>
                banker.banker_task.includes(selectedWork)
            );
            // console.log(selectedEmployees);

            // DetailSelectPage로 필터링된 정보를 전달
            navigate('/detail-select', { state: { selectedBankers} });
        }   
    }

    const moveToReservation = () => {
        navigate('/reservation'); 
    }

    return (
        <Container>
            <SubContainer>
                <Intro>어떤 업무를 처리하시겠습니까?</Intro>
                <WorkContainer>
                {works.map((banker_task, index) => (
                        <WorkBox
                            key={index}
                            onClick={() => handleSelectedWork(banker_task)}
                            isSelected={selectedWork === banker_task}

                            onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      isHovered={isHovered}
                        >
                            {banker_task}
                        </WorkBox>
                    ))}
                </WorkContainer>
       
                <CancelBtn onClick={moveToReservation}>취소</CancelBtn>
                <SelectBtn onClick={moveToDetailSelect}>확인</SelectBtn>
            </SubContainer>
           
        </Container>
    );
}

const SubContainer = styled.div`
    flex-grow: 1;
    text-align: center;

    padding-top: 70px;

`;

const Container = styled.div`
padding-left: 200px;
    padding-right: 200px;
    display: flex;
    flex-direction: column;
    height: calc(100vh - 120px);
    /* background-color: black; */
`;

const Intro = styled.div`
    font-size: 45px;
    font-weight: 900;
    margin-bottom: 60px;
    /* color: white; */
`;

const WorkContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    column-gap: 40px;
    row-gap: 30px;
    padding: 50px;
`;

const WorkBox = styled.div`
    font-size: 45px;
    border: 5px solid ${(props) => (props.isSelected ? '#F2B418' : '#d8d8d8')};
    background-color: ${(props) => (props.isSelected ? '#F2B418' : 'white')};
    color: ${(props) => (props.isSelected ? 'black' : 'black')};
    font-weight:  ${(props) => (props.isSelected ? '700' : '500')};;
    border-radius: 20px;
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.1s;

    &:hover { // 호버 시 배경색 변경
        border: 5px solid #F2B418;
    }
`;

const CancelBtn = styled.button`
    width: 150px;
    padding-top: 20px;
    padding-bottom: 20px;
    font-size: 25px;
    font-weight: 700;
    cursor: pointer;
    color: black;
    background-color: white;
    border: 3px solid black;
    border-radius: 10px;
    margin-right: 20px;
    margin-top: 50px;
`;

const SelectBtn = styled.button`
    width: 150px;
    padding-top: 20px;
    padding-bottom: 20px;
    font-size: 25px;
    font-weight: 900;
    color: white;
    cursor: pointer;
    background-color: black;
    border: 2px solid black;
    border-radius: 10px;
    margin-top: 50px;
`;

export default WorkSelectPage;
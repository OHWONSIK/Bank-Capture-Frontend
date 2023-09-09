import React, { useState } from 'react';
import { styled } from 'styled-components';

function ReserveTime(props) {
    const timeSelector = [
        '10:00', '11:00', '13:00', '14:00',
        '15:00', '16:00', '17:00',
    ];

    const [selectedTime, setSelectedTime] = useState("");

    const handleSelectedTime = (time) => {
        setSelectedTime(time);
    };

    return (
        <div>
            <TimeContainer>
                {timeSelector.map((time, index) => (
                    <TimeItem key={index}>
                        <TimeButton
                            onClick={() => handleSelectedTime(time)}
                            isSelected={selectedTime === time}
                        >
                            {time}
                        </TimeButton>
                    </TimeItem>
                ))}
            </TimeContainer>
            
        </div>
    );
}

const TimeContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    /* background-color: pink; */
    padding-top: 10px;
    margin-top: 10px;
   
`;

const TimeItem = styled.div`

`;

const TimeButton = styled.div`
    background-color: ${(props) => (props.isSelected ? 'black' : '#eaeaea')};
    color: ${(props) => (props.isSelected ? 'white' : 'black')};
    /* border: 1px solid black; */
    font-size: 20px;
    width: 80px;
    border-radius: 50px;
    text-align: center;
    /* background-color: #ebebeb; */
    margin-left: 2px;
    margin-right: 2px;
    margin-bottom: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;
    cursor: pointer;
`;

export default ReserveTime;
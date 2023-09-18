// ScheduleTime.js

import React from 'react';
import { styled } from 'styled-components';

function ScheduleTime(props) {
  const timeSelector = [
    '10:00', '11:00', '13:00', '14:00',
    '15:00', '16:00', '17:00',
  ];

  const { selectedTimes, setSelectedTimes } = props;

  const handleToggleTime = (time) => {
    // Check if the time is already selected
    const isSelected = selectedTimes.includes(time);

    // If selected, remove from the array, else add to the array
    const updatedTimes = isSelected
      ? selectedTimes.filter(selectedTime => selectedTime !== time)
      : [...selectedTimes, time];

    // Update the selected times state
    setSelectedTimes(updatedTimes);
  };

  return (
    <div>
      <TimeContainer>
        {timeSelector.map((time, index) => (
          <TimeItem key={index}>
            <TimeButton
              onClick={() => handleToggleTime(time)}
              isSelected={selectedTimes.includes(time)}
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
    padding-top: 10px;
    margin-top: 10px;
`;

const TimeItem = styled.div``;

const TimeButton = styled.div`
    background-color: ${(props) => (props.isSelected ? 'black' : '#eaeaea')};
    color: ${(props) => (props.isSelected ? 'white' : 'black')};
    font-size: 20px;
    width: 80px;
    border-radius: 50px;
    text-align: center;
    margin-left: 2px;
    margin-right: 2px;
    margin-bottom: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;
    cursor: pointer;
`;

export default ScheduleTime;

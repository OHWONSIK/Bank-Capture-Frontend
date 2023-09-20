import moment from 'moment';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { styled } from 'styled-components';

function ReserveDate(props) {
    const { selectedDate, setSelectedDate } = props;

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <div>
            <ReserveCalendar
                onChange={handleDateChange}
                value={selectedDate}
                formatDay={(locale, date) =>
                    date.toLocaleString('en', { day: 'numeric' })
                }
            />
        </div>
    );
}
const ReserveCalendar = styled(Calendar)`
    font-size: 24px;
    width: 600px;
    border: none;
    margin: auto; /* 가운데 정렬을 위한 마진 설정 */
  max-width: 600px; /* 최대 너비 설정 (선택사항) */
    /* border-radius: 10px; */
    padding-bottom: 80px;


    .react-calendar__navigation button {
        /* min-width: 44px; */
        background: none;
        font-size: 24px;
        margin-top: 20px;
    }
    .react-calendar__navigation button:enabled:hover,
    .react-calendar__navigation button:enabled:focus {
        background-color: white;
    }
    abbr[title] {
        text-decoration: none;
    }

    // day 티일 모양 커스텀
    .react-calendar__tile {
        border: 3px solid white;
        /* border-radius: 20px; */
        margin-bottom: 5px;
        font-size: 20px;
  }

    // day 타일 hover, focus시 커스텀
    .react-calendar__tile:enabled:hover,
    .react-calendar__tile:enabled:focus {
    background: #eaeaea;
    color: black;
    font-weight: bold;
    border-radius: 6px;
    }

    // '오늘' 날짜표시 커스텀
    .react-calendar__tile--now {
    background: #ffffff;
    border: 3px solid black;
    border-radius: 6px;
    font-weight: bold;
    color: black;
    }

    // '오늘' 날짜 hover,focus시 커스텀
    .react-calendar__tile--now:enabled:hover,
    .react-calendar__tile--now:enabled:focus {
        background: #ffffff;
        border: 3px solid black;
        border-radius: 6px;
        font-weight: bold;
        color: black;
    }

    // day 타일 선택되었을 때 커스텀
    .react-calendar__tile--active {
        background: black;
        border-radius: 6px;
        font-weight: bold;
        color: white;
    }

    // 선택된 day 타일 hover, focus시 커스텀
    .react-calendar__tile--active:enabled:hover,
    .react-calendar__tile--active:enabled:focus {
        background: black;
        color: white;
    }


`;

export default ReserveDate;
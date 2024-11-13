import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'; // 기본 css
import { ko } from "date-fns/locale"
import { styled } from "styled-components";

const Calendar: React.FC = () => {
  const [startDate, setStartDate] = useState(new Date());
  

  return (
    <DatepickerWrapper>
      <DatePicker
        showIcon
        dateFormat="yyyy년 MM월 dd일"
        dateFormatCalendar="yyyy년 MM월"
        selected={startDate}
        onChange={(date: Date) => setStartDate(date)}
        className="red-border"
        locale={ko}
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
          </svg>
        }
      />
    </DatepickerWrapper>
  )
}


const DatepickerWrapper = styled.div`
  .react-datepicker__input-container {
    border: 2px solid rgb(186, 217, 241);
    display: flex;
    align-items: center; 
  }

  .react-datepicker__calendar-icon {
    margin-top: 1px;
    padding: 5px;
    color: #a6cfe9;
    width: 23px;
    height: 23px;
  }
  
  input {
    width: 180px;
    color: #3f3f46;
    margin-left: 8px;
    caret-color: transparent;
  }

  .react-datepicker { // 캘린더의 테두리 지정
    border-radius: 12px;
  }

  .react-datepicker__navigation-icon react-datepicker__navigation-icon--previous {

  }

  .react-datepicker__header { // 캘린더의 Header
    background-color: #e0f2fe;
    border-top-right-radius: 12px;
    border-top-left-radius: 12px;
    border-bottom: none;
  }

  .react-datepicker__triangle {
    visibility: hidden;
  }
  
  .react-datepicker__current-month {
    font-weight: 700; 
    margin-bottom: 10px;
  }

  .react-datepicker__day-names { // 요일
    font-size: 12px;
  }

  .react-datepicker__day-name { // 요일
    color: #3f3f46;
  }

  .react-datepicker__day:hover { // 날짜에 마우스를 올렸을 때
    border-radius: 15px;
  }

  .react-datepicker__day--selected { // 선택된 날짜
    background-color: rgb(186, 217, 241);
    border-radius: 15px;
  }

  .react-datepicker__day--today { // 오늘 날짜
    
  }

  .react-datepicker__day--outside-month { // 현재 달이 아닌 날짜
    color: grey;
  }
`


export default Calendar
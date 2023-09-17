// ReviewPage.js
import React from 'react';
import { useLocation,useParams } from 'react-router-dom';

function ReviewPage(props) {
  const location = useLocation();
  
  const { reservationId } = useParams();

  // 이전 페이지에서 전달된 예약 정보를 가져옵니다.
  const { state } = location;
  const bankName = state ? state.bank_name : "Bank Name Not Found";
  const bankerName = state ? state.banker_name : "Banker Name Not Found";

  console.log(state)
  console.log(bankName);
  console.log(bankerName);
  return (
    <div>
      <h2>Review Page</h2>
      <p>예약한 은행: {bankName}</p>
      <p>예약한 행원: {bankerName}</p>
      {/* 리뷰 작성 폼 등을 추가할 수 있습니다. */}
    </div>
  );
}

export default ReviewPage;

import React, {useState} from 'react';
import { useLocation, useParams } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { styled } from 'styled-components';

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

  const [bankRating, setBankRating] = useState(0);
  const [bankerRating, setBankerRating] = useState(0);

  // 별점을 클릭할 때 호출될 함수
  const handleBankRatingChange = (newBankRating) => {
    setBankRating(newBankRating);
  };
  const handleBankerRatingChange = (newBankerRating) => {
    setBankerRating(newBankerRating);
  };

  return (
    <Container>
      <BankName>{bankName}은 어떠셨나요?</BankName>
      <ReviewRating>
        <StarRatings
          rating={bankRating}
          starRatedColor="#ffb516"
          starHoverColor="#ffb516"
          starEmptyColor="#c4c4c4"
          changeRating={handleBankRatingChange}
          starDimension="80px"
          starSpacing="2px"
        />
      </ReviewRating>

      <BankerName>{bankerName} 행원은 어떠셨나요?</BankerName>
      <ReviewRating>
        <StarRatings
          rating={bankerRating}
          starRatedColor="#ffb516"
          starHoverColor="#ffb516"
          starEmptyColor="#c4c4c4"
          changeRating={handleBankerRatingChange}
          starDimension="80px"
          starSpacing="2px"
        />
      </ReviewRating>

      <ReviewText
        type="text"
        placeholder="리뷰를 작성해주세요."
      />

      <BtnContainer>
        <CancelBtn>작성 취소</CancelBtn>
        <WriteBtn>작성 완료</WriteBtn>
      </BtnContainer>
    </Container>
  );
}

const Container = styled.div`

display: flex;
flex-direction: column;
align-items: center;

margin-top: 100px;
`;
const ReviewRating = styled.div`
    margin-bottom: 50px;
`;
const BankName = styled.div`
    font-size: 55px;
    font-weight: 700;
    margin-bottom: 20px;
`;
const BankerName = styled.div`
    font-size: 55px;
    font-weight: 700;
    margin-bottom: 20px;
`;
const ReviewText = styled.textarea`
    display: inline-flex;
    width: 750px;
    height: 200px;
    border-radius: 20px;
    border: 1px solid #bdb4b4;
    outline: none;
    resize: none;
    font-size: 25px;
    font-weight: 500;
    padding: 20px;

    white-space: normal;
    &::placeholder {
        color: #bdb4b4;
    }
`;

const BtnContainer = styled.div`

`;

const CancelBtn = styled.button`
    width: 200px;
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 25px;
    font-weight: 700;
    cursor: pointer;
    background-color: white;
    border: 2px solid black;
    border-radius: 10px;
    margin-right: 50px;
    margin-top: 50px;
`;

const WriteBtn = styled.button`
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
export default ReviewPage;

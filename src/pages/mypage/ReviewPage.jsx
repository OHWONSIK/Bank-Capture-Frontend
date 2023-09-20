import React, {useState} from 'react';
import { useLocation, useParams, useNavigate } from "react-router-dom";
import StarRatings from 'react-star-ratings';
import { styled } from 'styled-components';
import axios from "axios";
import { API } from "../../config";
import Swal from "sweetalert2";

function ReviewPage(props) {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { reservationId } = useParams();

  // 이전 페이지에서 전달된 예약 정보를 가져옵니다.
  const { state } = location;
  const bankName = state ? state.bankName : "Bank Name Not Found";
  const bankerName = state ? state.bankerName : "Banker Name Not Found";

  console.log(state)
  console.log(bankName);
  console.log(bankerName);

  const [bankRating, setBankRating] = useState(0);
  const [bankerRating, setBankerRating] = useState(0);
  const [comment, setComment] = useState("");

  // const [bankRatingError, setBankRatingError] = useState("");
  // const [bankerRatingError, setBankerRatingError] = useState("");
  // const [commentError, setCommentError] = useState("");

  // 별점을 클릭할 때 호출될 함수
  const handleBankRatingChange = (newBankRating) => {
    setBankRating(newBankRating);
  };
  const handleBankerRatingChange = (newBankerRating) => {
    setBankerRating(newBankerRating);
  };

  const handleCancle = () => {
    navigate(-1);
  }

  const handleReview = () => {

    //은행별점, 행원별점, 코멘트 하나라도 입력되지 않은 경우 에러 메시지 표시
   
      if (bankRating === 0) {
        Swal.fire("리뷰작성 실패", "은행 별점을 선택해주세요.", "error");
        return;
      }
      if (bankerRating === 0) {
        Swal.fire("리뷰작성 실패", "행원 별점을 선택해주세요.", "error");
        return;
      }
      if (!comment) {
        Swal.fire("리뷰작성 실패", "코멘트를 작성해주세요.", "error");
        return;
      }
    
    Swal.fire({
        title: "리뷰작성",
        text: "리뷰를 작성하시겠습니까?",
        icon: "info",

        showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
        confirmButtonColor: "#3085d6", // confrim 버튼 색깔 지정
        cancelButtonColor: "#d33", // cancel 버튼 색깔 지정
        confirmButtonText: "확인", // confirm 버튼 텍스트 지정
        cancelButtonText: "취소", // cancel 버튼 텍스트 지정

        //reverseButtons: true, // 버튼 순서 거꾸로
    }).then((result) => {
        if (result.isConfirmed) {
            // 만약 모달창에서 confirm 버튼을 눌렀다면

            axios
                .post(`${API.REVIEW_INSERT}`, {
                    bankStarRating: bankRating,
                    bankerReviewComment: comment,
                    bankerStarRating: bankerRating,
                    reservationId: reservationId,
                })
                .then((response) => {
                    console.log("리뷰 작성 성공:", response.data);
                })
                .catch((error) => {
                    alert("리뷰 작성 에러:", error);
                });

            Swal.fire({
                title: "리뷰작성완료",
                text: "확인을 누르시면 마이페이지로 돌아갑니다.",
                icon: "success",

                confirmButtonColor: "#3085d6", // confrim 버튼 색깔 지정
                confirmButtonText: "확인", // confirm 버튼 텍스트 지정
            }).then((result) => {
                // 리뷰작성 성공하면 고객 마이페이지로 이동합니다.
                navigate("/customer-mypage");
            });
        }
    });

    

    

  }

  return (
      <Container>
          <BankName>{bankName.substr(7)}은 어떠셨나요?</BankName>
          <ReviewRating>
              <StarRatings
                  rating={bankRating}
                  starRatedColor="#ffb516"
                  starHoverColor="#ffb516"
                  starEmptyColor="#c4c4c4"
                  changeRating={handleBankRatingChange}
                  starDimension="60px"
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
                  starDimension="60px"
                  starSpacing="2px"
              />
          </ReviewRating>

          <ReviewText
              type="text"
              placeholder="리뷰를 작성해주세요."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
          />

          <BtnContainer>
              <CancelBtn onClick={handleCancle}>작성 취소</CancelBtn>
              <WriteBtn onClick={handleReview}>작성 완료 </WriteBtn>
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
    margin-top: 100px;
    margin-bottom: 200px;
    padding: 20px;
    background-color: white; // 원하는 배경색으로 변경 가능. 좀 더 연한 회색으로 설정했습니다.
    border-radius: 50px; // 둥근 테두리를 위한 속성, 값은 필요에 따라 조절 가능합니다.
    box-shadow: 0px 3px 6px rgba(0,0,0,0.16); // 그림자 효과 추가
`;
const BankName = styled.div`
    font-size: 45px;
    font-weight: 700;
    margin-bottom: 30px;
`;
const BankerName = styled.div`
    font-size: 45px;
    font-weight: 700;
    margin-bottom: 30px;
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
    margin-bottom: 50px;

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

// const ErrorMessage = styled.div`
//     color: red;
//     font-size: 14px;
//     margin-top: 5px;
// `;

export default ReviewPage;

import React, { useState } from "react";
import { styled } from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { BiSolidComment } from "react-icons/bi";
import reviewProfile from "../assets/image/review_profile.png";
import StarRatings from "react-star-ratings";
import { useEffect } from "react";
import axios from "axios";
import { API } from "../config";
import Swal from "sweetalert2";

function BankerSelect(props) {
    //선택된 은행원 주업무 및 자격증, 리뷰 더미데이터
    // const bankerinfo = [
    //     {
    //         banker_task_list: ['개인대출', '적금', '예금'],
    //         certification_list: ['투자 운용사', '회계사'],

    //         banker_review_list: [
    //             {
    //                 reservation_date: '2023.09.04',
    //                 rating: 5,
    //                 comment: '서비스가 매우 만족스러웠습니다.'
    //             },
    //             {
    //                 reservation_date: '2023.09.01',
    //                 rating: 2.3,
    //                 comment: '친절하고 빠른 응대가 좋았습니다.'
    //             },
    //             {
    //                 reservation_date: '2023.09.20',
    //                 rating: 4.5,
    //                 comment: '필요한 서류를 미리 안내해주셨고, 친절하셨습니다.'
    //             },
    //             {
    //                 reservation_date: '2023.09.14',
    //                 rating: 4.3,
    //                 comment: '좋아요~'
    //             },
    //             {
    //                 reservation_date: '2023.07.14',
    //                 rating: 4.0,
    //                 comment: '좋아요~'
    //             },
    //             {
    //                 reservation_date: '2023.09.11',
    //                 rating: 4.3,
    //                 comment: '좋아요~'
    //             },
    //             {
    //                 reservation_date: '2023.08.20',
    //                 rating: 1.0,
    //                 comment: '좋아요~'
    //             },
    //         ],
    //     }
    // ]

    const [activeFilter, setActiveFilter] = useState("filter1");
    const [sortedReviews, setSortedReviews] = useState([]);
    const [certificationList, setCertificationList] = useState([]);

    useEffect(() => {
        //행원Id로 해당 행원 상세정보조회
        axios
            .get(`${API.BANKER_INFO}`, {
                params: {
                    bankerId: selectedBanker.bankerId,
                },
            })
            .then((response) => {
                //리뷰리스트 저장
                setSortedReviews(response.data.bankerReviewList);
                //자격증리스트 저장
                setCertificationList(response.data.certificationList);
            })
            .catch((error) => {
                console.error("조회 에러:", error);
            });
    }, []);

    const location = useLocation();
    const selectedBanker = location.state.selectedBanker || [];
    const reservationId = location.state.reservationId || "";
    const reservationDate = location.state.reservationDate;
    const reservationTime = location.state.reservationTime;
    const taskId = location.state.taskId;
    const bankId = location.state.bankId;

    const navigate = useNavigate();

    //뒤로가기 버튼
    const handleGoBack = () => {
        navigate(-1);
    };

    //현재 백엔드 로직이 변경되지않아 코멘트만 출력되고 별점이 출력되지않아서 필터확인불가
    const handleFilterClick = (filterName) => {
        setActiveFilter(filterName);
        let sortedList = [...sortedReviews];
        switch (filterName) {
            case "filter2":
                // 별점 높은 순 정렬
                sortedList.sort(
                    (a, b) => b.bankerStarRating - a.bankerStarRating
                );
                break;
            case "filter3":
                // 별점 낮은 순 정렬
                sortedList.sort(
                    (a, b) => a.bankerStarRating - b.bankerStarRating
                );
                break;
            case "filter1":
            default:
                // 최신 순 정렬 (기본)
                sortedList.sort(
                    (a, b) =>
                        new Date(b.bankerReviewDate) -
                        new Date(a.bankerReviewDate)
                );
                break;
        }

        //필터적용해서 정렬된 리뷰리스트 저장
        setSortedReviews(sortedList);
    };

    //예약하기버튼
    const handleReservation = async () => {
        Swal.fire({
            title: "예약하기",
            text:
                "행원 " +
                selectedBanker.bankerName +
                "님으로 예약하시겠습니까?",
            icon: "warning",

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
                    .post(`${API.RESERVATION_BOOK}`, {
                        bankId: 1,
                        bankerId: selectedBanker.bankerId,
                        customerId: 1,
                        reservationDate: reservationDate,
                        // reservationFinishFlag: "F",
                        reservationId: reservationId,
                        reservationTime: reservationTime,
                        taskId: taskId,
                    })
                    .then((response) => {
                        console.log("예약 성공:", response.data);

                    })
                    .catch((error) => {
                        alert("예약 에러:", error);
                    });

                Swal.fire({
                    title: "예약완료",
                    text: "확인을 누르시면 홈화면으로 돌아갑니다.",
                    icon: "success",

                    confirmButtonColor: "#3085d6", // confrim 버튼 색깔 지정
                    confirmButtonText: "확인", // confirm 버튼 텍스트 지정
                }).then((result) => {
                    // 예약 성공하면 초기 페이지로 이동합니다.
                    navigate("/");
                });
            }
        });
    };

    return (
        <Container>
            <SubContainer>
                <LeftContainer>
                    <BankerInfo>
                        <Profile
                            src={selectedBanker.bankerImgPath}
                            alt={"프로필 이미지"}
                        ></Profile>
                        <Text>
                            <Name>행원 {selectedBanker.bankerName}</Name>
                            <PrAndCareer>
                                <Pr>{selectedBanker.bankerInfo}</Pr>
                                <Career>({selectedBanker.bankerCareer})</Career>
                            </PrAndCareer>
                            <RatingAndComment>
                                <Rating>
                                    <AiFillStar
                                        style={{ marginRight: "5px" }}
                                    />
                                    {selectedBanker.bankerAvgStar.toFixed(1)}
                                </Rating>
                                <Comment>
                                    <BiSolidComment
                                        style={{ marginRight: "5px" }}
                                    />
                                    {selectedBanker.bankerCommentCnt}
                                </Comment>
                            </RatingAndComment>
                        </Text>
                    </BankerInfo>
                    <Title>주 상담 내용</Title>
                    <MainTask>
                        {/* {selectedBanker.taskList.map((task, index) => (
                            <div key={index}>{task.taskName}</div>
                        ))} */}
                        {selectedBanker.taskList
                            .map((task) => task.taskName)
                            .join(" / ")}
                    </MainTask>
                    <Title>자격증</Title>
                    <Certification>
                        {certificationList
                            .map(
                                (certification) =>
                                    certification.certificationName
                            )
                            .join(" / ")}
                    </Certification>
                    <BtnContainer>
                        <BackBtn onClick={handleGoBack}>뒤로 가기</BackBtn>
                        <ReserveBtn onClick={handleReservation}>
                            예약하기
                        </ReserveBtn>
                    </BtnContainer>
                </LeftContainer>

                <RightContainer>
                    <FilterContainer>
                        <Filter1
                            active={activeFilter === "filter1"}
                            onClick={() => handleFilterClick("filter1")}
                        >
                            <Dot active={activeFilter === "filter1"}></Dot>{" "}
                            최신순
                        </Filter1>
                        <Filter2
                            active={activeFilter === "filter2"}
                            onClick={() => handleFilterClick("filter2")}
                        >
                            <Dot active={activeFilter === "filter2"}></Dot> 별점
                            높은 순
                        </Filter2>
                        <Filter3
                            active={activeFilter === "filter3"}
                            onClick={() => handleFilterClick("filter3")}
                        >
                            <Dot active={activeFilter === "filter3"}></Dot> 별점
                            낮은 순
                        </Filter3>
                    </FilterContainer>
                    <ReviewContainer>
                        {sortedReviews.map((review, i) => (
                            <ReviewBox key={i}>
                                <ReviewProfile
                                    src={reviewProfile}
                                    alt={"리뷰 프로필 이미지"}
                                ></ReviewProfile>
                                <Text>
                                    <ReviewDate>
                                        {review.bankerReviewDate}
                                    </ReviewDate>
                                    <ReviewRating>
                                        <StarRatings
                                            rating={review.bankerStarRating}
                                            starRatedColor="#FF5151"
                                            starEmptyColor="#c4c4c4"
                                            starDimension="20px"
                                            starSpacing="2px"
                                        />
                                    </ReviewRating>

                                    <ReviewComment>
                                        {review.bankerReviewComment}
                                    </ReviewComment>
                                </Text>
                            </ReviewBox>
                        ))}
                    </ReviewContainer>
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
    margin-right: 20px;
    /* display: flex;  */
    /* flex-direction: column; */
`;

const RightContainer = styled.div`
    flex: 1;
    /* border: 1px solid black; */
    overflow-y: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
    position: relative;
`;

const BtnContainer = styled.div`
    /* background-color: yellow; */
    display: flex;
    justify-content: center;
`;

const BankerInfo = styled.div`
    display: flex;
    align-items: center;
    padding: 40px;
    border-bottom: 1px solid lightgray;
`;

const FilterContainer = styled.div`
    position: sticky;
    top: 0;
    z-index: 1;
    display: flex;
    font-size: 20px;
    font-weight: 500;
    justify-content: flex-end;
    background-color: white;
    padding-bottom: 20px;
    cursor: pointer;
`;

const Filter1 = styled.div`
    display: flex;
    align-items: center;

    margin-right: 15px;
    color: ${(props) => (props.active ? "#000" : "#888888")};
`;
const Filter2 = styled.div`
    display: flex;
    align-items: center;
    margin-right: 15px;
    color: ${(props) => (props.active ? "#000" : "#888888")};
`;
const Filter3 = styled.div`
    display: flex;
    align-items: center;
    color: ${(props) => (props.active ? "#000" : "#888888")};
`;

const Dot = styled.div`
    display: inline-block;
    margin-right: 5px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${(props) => (props.active ? "#45ADA6" : "#888888")};
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

const Title = styled.div`
    font-size: 24px;
    font-weight: 700;
    margin-left: 40px;
    margin-top: 30px;
`;

const MainTask = styled.div`
    font-size: 20px;
    margin-left: 40px;
    margin-top: 15px;
    color: #888888;
    font-weight: 500;
`;

const Certification = styled.div`
    font-size: 20px;
    margin-left: 40px;
    margin-top: 15px;
    color: #888888;
    font-weight: 500;
`;

const ReviewProfile = styled.img`
    width: 70px;
    height: 70px;
`;

const ReviewContainer = styled.div``;

const ReviewBox = styled.div`
    display: flex;
    align-items: center;
    padding: 40px;
    border-bottom: 1px solid lightgray;
`;

const ReviewDate = styled.div`
    font-size: 18px;
`;

const ReviewRating = styled.div``;

const ReviewComment = styled.div`
    font-size: 20px;
`;

const BackBtn = styled.button`
    width: 200px;
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 25px;
    font-weight: 700;
    cursor: pointer;
    background-color: white;
    border: 2px solid black;
    border-radius: 10px;
    margin-right: 20px;
    margin-top: 200px;
`;

const ReserveBtn = styled.button`
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
    margin-top: 200px;
`;

export default BankerSelect;

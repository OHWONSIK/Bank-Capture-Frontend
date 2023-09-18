import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { markerdata } from "./markerdata";
import "./Maps.css";
import axios from "axios";
import { API } from "../config";

const { kakao } = window;


const Map = () => {
    const [bankList, setBankList] = useState([]);
    const [kakaoMap, setKakaoMap] = useState(null);
    const container = useRef();
  const navigate = useNavigate(); // useNavigate 훅 추가
  

  

  useEffect(() => {
      
    // function closeOverlay() {
    //     infowindow.setMap(null); // 인포윈도우 닫기
    // }

        axios
            .get(`${API.BANK_INQUIRY}`)
            .then((response) => {
                console.log("지점조회 성공:", response.data);
                setBankList(response.data);
            })
            .catch((error) => {
                console.error("지점조회 에러:", error);
                // 지점조회 실패시 에러메시지 출력
            });

        const options = {
            center: new kakao.maps.LatLng(37.503946, 127.048527),
            level: 1,
        };

        const map = new kakao.maps.Map(container.current, options);
        setKakaoMap(map);
    }, [container]);

    const imageSrc = [
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
    ]; // 마커이미지의 주소입니다
    const imageSize = new kakao.maps.Size(48, 48);
  const imageOption = { offset: new kakao.maps.Point(10, 48) };
  

    useEffect(() => {
        if (kakaoMap === null) {
            return;
        }

        // 커스텀 오버레이에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
        var markerVar = document.getElementById("map");
        if (markerVar.hasChildNodes()) {
            let children = markerVar.childNodes;
            children[0].firstChild.lastChild.textContent = "";
        }

        for (var i = 0; i < bankList.length; i++) {
            var bankId = bankList[i].bankId;
            var markerpos = new kakao.maps.LatLng(
                bankList[i].locationY,
                bankList[i].locationX
            );

            var markerImage = new kakao.maps.MarkerImage(
                imageSrc,
                imageSize,
                imageOption
            );
            var marker = new kakao.maps.Marker({
                map: kakaoMap,
                position: markerpos,
                image: markerImage,
                id: bankId,
            });
            marker.id = bankId;

            var infowindow = new kakao.maps.CustomOverlay({
                position: marker.getPosition(),
                clickable: true,
                id: marker.id,
                removable: true,
            });

          (function (marker, infowindow) {
              
            


            kakao.maps.event.addListener(marker, "click", function () {
                  
              

                    const bankData = markerdata.find(
                        (data) => data.bankId === marker.id
                    );
                    if (bankData) {
                        const avgStar = bankData.avgstar; // 평균 평점
                        const starRating = [];

                        // 평점에 따라 별 아이콘을 생성
                        for (let i = 1; i <= 5; i++) {
                            if (i <= avgStar) {
                                // 빨간색 별 아이콘
                                starRating.push("⭐️");
                            } else {
                                // 회색 별 아이콘
                                starRating.push("☆");
                            }
                        }
                      infowindow.setContent(
                          
                        
                            '<div class="wrap">' +
                                '    <div class="info">' +
                                '        <div class="title">' +
                                bankData.bankName +
                                '            <div class="close" onclick="closeOverlay(infowindow)" title="닫기"></div>' +
                                "        </div>" +
                                '        <div class="body">' +
                                '            <div class="img">' +
                                '                <img src="data:image/png;base64,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" width="73" height="70">' +
                                "           </div>" +
                                '            <div class="desc">' +
                                '                <div class="ellipsis">' +
                                bankData.bankAddr +
                                "</div>" +
                                '                <div class="jibun ellipsis">' +
                                bankData.bankPhone +
                                "</div>" +
                                '                  <div class="jibun ellipsis">' +
                                starRating.join("") +
                                "</div>" +
                                '               <div><a href="work-select" class="link" onclick="handleReservationClick(\'' +
                                bankData.bankId +
                                "')\">예약하기</a></div>" +
                                "</div>" +
                                "        </div>" +
                                "    </div>" +
                                "</div>"
                        );

                        // infowindow.setContent(
                        //     '<div class="infoWindow">' +
                        //     ' <div class="detailTitle">' +
                        //     '  <div class="bankName"> ' +
                        //     bankData.bankName +
                        //     " </div>" +
                        //     '  <div class="bankAddr"> ' +
                        //     bankData.bankAddr +
                        //     " </div>" +
                        //     '  <div class="bankPhone"> ' +
                        //     "전화번호: " + bankData.bankPhone +
                        //     " </div>" +
                        //     '  <div class="avg"> ' +
                        //     "평균 평점: " + bankData.avgstar +
                        //     " </div>" +
                        //     `<button id="close" title="닫기"></button>` +
                        //     "</div>"

                        //   );
                        infowindow.setMap(kakaoMap, marker);
                        kakaoMap.setCenter(marker.getPosition());
                    }
                });

                // 마커에 마우스아웃 이벤트를 등록합니다
                kakao.maps.event.addListener(kakaoMap, "click", function () {
                    infowindow.setMap(null);
                });
            })(marker, infowindow);
            window.handleReservationClick = (bankId) => {
                // bankId를 가지고 work-select 페이지로 이동
              console.log(bankId)
              navigate("/work-select", { state: { bankId: bankId } });
            };
        }
    }, [kakaoMap, bankList]);

    return (
        <div>
            <div
                id="map"
                style={{
                    width: "100vw",
                    height: "calc(100vh - 48px)",
                }}
                ref={container}
            ></div>
        </div>
    );
};

export default Map;

// .env에 카카오맵 키 적어두긴 했는데 적용이 안 됨 -> 해결해줄 수 있다면 해주삼
// function KakaoMap(props) {
//     const [isOpen, setIsOpen] = useState(false)

//     return (
//         <>
//                    <MarkerWithCustomOverlayStyle />

//         <MapContainer>

//             <Map

//                 center={{ lat: 37.503946, lng: 127.048527 }} // 지도 중심좌표
//                 style={{ width: "100vw", height: "100vh" }} // 지도 크기
//             >
//                 {markerdata.map((position,index)=>(
//                     <>
//                     <MapMarker key={position.bank_name} position={{ lat: position.lat, lng: position.lng }}
//                         image={{
//                             src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커이미지의 주소입니다
//                             size: {
//                                 widht: 24,
//                                 height: 35
//                             } // 마커이미지의 크기입니다
//                         }}
//                         title={position.bank_name} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
//                         onClick={() => setIsOpen(true)} />
//                         {isOpen && (
//                           <CustomOverlayMap position={ {lat: position.lat, lng: position.lng}}>
//                             <div className="wrap">
//                               <div className="info">
//                                 <div className="title">{position.bank_name}
//                                 <div
//                     className="close"
//                     onClick={() => setIsOpen(false)}
//                     title="닫기"
//                   ></div>
//                   </div>
//                   <div className="desc">
//                     <div className="ellipsis">{position.bank_addr}</div>
//                     <div className="jibun ellipsis">
//                      {position.bank_phone}
//                     </div>
//                    </div>
//                    </div>
//                    </div>;
//                    </CustomOverlayMap>)}

//                     </>
//                 ))}

//                 </Map>
//         </MapContainer>
//         </>

//     );
// }

// const MapContainer = styled.div`
//     position: fixed;
//     width: 100vw;
//     height: 100vh;
// `;

// export default KakaoMap;

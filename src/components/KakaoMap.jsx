import React, { useEffect, useState, useRef } from 'react';
import { markerdata } from './markerdata';
import ReservationApi from './ReservationApi';
import "./Map.css";
const { kakao } = window;

const Map = () => {
 // const [bankList, setBankList] = useState(JSON.parse(sessionStorage.getItem("result")));
 const [bankList, setBankList] = useState(markerdata);
  const [kakaoMap, setKakaoMap] = useState(null);
  const container = useRef();

  useEffect(() => {
    const options = {
      center: new kakao.maps.LatLng(37.503946, 127.048527),
      level: 3,
    };
    const map = new kakao.maps.Map(container.current, options);
    setKakaoMap(map);
  }, [container]);

  useEffect(() => {
    if (kakaoMap === null || !bankList) {
      return;
    }

    const imageSrc = ["https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"]; // 마커이미지의 주소입니다
    const imageSize = new kakao.maps.Size(48, 48);
    const imageOption = { offset: new kakao.maps.Point(10, 48) };

    // 커스텀 오버레이에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
    var markerVar = document.getElementById("map");
    if (markerVar.hasChildNodes()) {
      let children = markerVar.childNodes; 
      children[0].firstChild.lastChild.textContent = ""; 
    }

    for (var i = 0; i < bankList.length; i++) {
      var bankId = bankList[i].id;
      var markerpos = new kakao.maps.LatLng(
        bankList[i].latitude,
        bankList[i].longitude
      );

      var markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      );
      const marker = new kakao.maps.Marker({
        map: kakaoMap,
        position: markerpos,
        image: markerImage,
        id: bankId,
      });
      marker.id = bankId;

      const infowindow = new kakao.maps.CustomOverlay({
        position: marker.getPosition(),
        clickable: true,
        id: marker.id,
        removable: true,
      });
      (function (marker,infowindow){
        kakao.maps.event.addListener(marker, "click", function () {
            markerdata(marker.id).then((response) => {
              infowindow.setContent(
                '<div class="infoWindow">' +
                ' <div class="detailTitle">' +
                '  <div class="bankName"> ' +
                response.bankName +
                " </div>" +
                '  <div class="bankAddr"> ' +
                response.bankAddr +
                " </div>" +
                `<button id="close" title="닫기"></button>` +
                "</div>"
              );});
              infowindow.setMap(kakaoMap, marker);
              kakaoMap.setCenter(marker.getPosition());
            });
       
           // 마커에 마우스아웃 이벤트를 등록합니다
           kakao.maps.event.addListener(kakaoMap, "click", function () {
            infowindow.setMap(null);
          });
        })(marker, infowindow);
      }
    }, [kakaoMap, bankList]);


console.log(bankList)
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
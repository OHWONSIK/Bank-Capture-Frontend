import React from 'react';
import { Map } from 'react-kakao-maps-sdk';
import { styled } from 'styled-components';

// .env에 카카오맵 키 적어두긴 했는데 적용이 안 됨 -> 해결해줄 수 있다면 해주삼
function KakaoMap(props) {
    
    return (
        <MapContainer>
            <Map
                center={{ lat: 33.5563, lng: 126.79581 }} // 지도 중심좌표
                style={{ width: "100vw", height: "100vh" }} // 지도 크기
            />
        </MapContainer>

    );
}

const MapContainer = styled.div`
    position: fixed;
    width: 100vw;
    height: 100vh;
`;

export default KakaoMap;
import React from 'react';
import { styled } from 'styled-components';

function Footer(props) {
    return (
        <Container>
            <Text1>About Us</Text1>
            <Text2>Contact</Text2>
            <Text3>개인정보 처리방침</Text3>
            <Text4>서비스 이용약관</Text4>
        </Container>
    );
}

const Container = styled.div`
    height: 200px;
    background-color: black;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Text1= styled.div`
margin-left: 500px;
font-size: 18px;
color: white;
`;

const Text2= styled.div`
font-size: 18px;
color: white;
`;

const Text3= styled.div`
font-size: 18px;
color: white;
`;

const Text4= styled.div`
margin-right: 500px;
font-size: 18px;
color: white;
`;
export default Footer;
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
    height: 100px;
// background-color: yellow; 
    /* border-top: 1px solid #bdb4b4; */
    /* bottom: 0; */
    /* position: fixed; */
    /* width: 100vw; */
    /* background-color: pink; */
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Text1= styled.div`
margin-left: 400px;
font-size: 15px;
`;

const Text2= styled.div`
font-size: 15px;
`;

const Text3= styled.div`
font-size: 15px;
`;

const Text4= styled.div`
margin-right: 400px;
font-size: 15px;
`;
export default Footer;
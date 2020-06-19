import React from 'react';
import styled from 'styled-components';
import twitterIcon from './twitter_64x64.png';

export const Wrapper = styled.div`
   width: 43%;
`;

export const Heading = styled.div`
   width: 100%;
   height: 50px;
   position: fixed;
   color: white;
   background: #0b98ba;
   font-size: 20px;
   font-weight: bold;
   padding: 0 10px;
   line-height: 50px;
   box-shadow: 0px 2px 4px #888888;
`;

export const ScrollView = styled.div`
   position: relative;
   top: 50px;
   height: calc(100vh - 50px);
   overflow-y: scroll;
`;

const Image = styled.img`
   height: 32px;
   width: 32px;
   padding: 0 10px;
`;

const Item = styled.div`
   cursor: pointer;
   margin: 5px 0px;
   border-radius: 3px;
   box-shadow: 0 0 black;
   background-color: #2b629e;
   color: white;
   display: flex;
   height: 50px;
   align-items: center;
   border: ${props => props.active ? '2px solid red' : 'none'};
`;

const Text = styled.span`
   height: 30px;
   overflow: hidden;
   white-space: nowrap;
   text-overflow: ellipsis;
`;

export const Tweet = (props) => {
   return (
      <Item onClick={props.clickHandler} active={props.active}>
         <Image src={twitterIcon} />
         <Text>{props.data}</Text>
      </Item>
   );
}
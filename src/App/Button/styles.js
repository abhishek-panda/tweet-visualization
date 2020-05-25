import styled from 'styled-components';

export const ButtonWrapper = styled.button`
   position: absolute;
   height: 35px;
   width: 150px;
   border-radius: 3px;
   outline: none;
   cursor: pointer;
   border-color: #5DA8DC;
   color: ${props => props.isActive ? '#FFFFFF' : '#5DA8DC'};
   background-color: ${props => props.isActive ? '#5DA8DC' : '#FFFFFF'};
   margin: 10px;
`;
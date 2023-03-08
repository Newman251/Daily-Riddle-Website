import React from 'react';
// import menuRounded from '@iconify/icons-material-symbols/menu-rounded';
import styled from 'styled-components';
import WriddleLogo from './wriddleLogo.PNG';

// Make it skip a few spaces above the riddle
const StyledImage = styled.img`
display: center;
margin-top: 0em;
width: 50%;
height: 240%;

`;


function SetLogo() {

  return (
    <div>
        <StyledImage src={WriddleLogo} />
    </div>
  );
}

export default SetLogo;
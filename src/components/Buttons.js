import React from 'react';
// import menuRounded from '@iconify/icons-material-symbols/menu-rounded';
import styled from 'styled-components';
import Leaderboard from './Leaderboard';
import Menu from './Menu.js';


// In row style for leaderboard and menu
const Row = styled.div`
  display: flex;
  flex-direction: row;
`;


function SetLogo() {

  return (
    <div>
        <Row>
            <Leaderboard />
            <Menu />
        </Row>
    </div>
  );
}

export default SetLogo;
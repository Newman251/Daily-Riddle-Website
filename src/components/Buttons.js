import React from 'react';
// import menuRounded from '@iconify/icons-material-symbols/menu-rounded';
import styled from 'styled-components';
import Leaderboard from './Leaderboard.js';
import Menu from './Menu.js';


// In row style for leaderboard and menu
const Row = styled.div`
  display: flex;
  flex-direction: row;
`;


function SetLogo({answer}) {

  return (
    <div>
        <Row>
          <Leaderboard answer={answer} />
            <Menu />
        </Row>
    </div>
  );
}

export default SetLogo;
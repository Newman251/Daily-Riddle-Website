import React, { useState} from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import LeaderboardList from './LeaderboardList.js';

const Leaderboard = ({answer}) => {
  const [showLeaderboards, setShowLeaderboards] = useState(false);

  const handleClick = () => {
    setShowLeaderboards(!showLeaderboards);
  };

// Style the Icon
const StyledIcon = styled(Icon)`
font-size: 2em;
background-color: transparent;
color: #36454f;
`;

// Leaderboard button on the left side of the screen, inline with the menu button
const LeaderboardButton = styled.button`
display: inline-block;
background-color: transparent;
border: 1px solid transparent;
font-size: 1em;
margin: 1em 1em;
top: 0.1em;
right: 77%;
`;

  return (
    <div>
      <LeaderboardButton onClick={handleClick}>
        <StyledIcon icon="ic:round-leaderboard" />
      </LeaderboardButton>
      {showLeaderboards && (
        <div
        style = {{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: '0',
          flexDirection: 'column',
          backgroundColor: '#f5f5dc',
          boxShadow: '0 2px 18px rgba(0, 0, 0, 0.15)',
          padding: '6em',
        }}>
          <LeaderboardList answer = {answer}/>
          <button onClick={handleClick} 
          style = {{
            background: 'Gray',
            font:'3em',
            color: 'black',
            padding: '1em 4em',
            border: '1px solid black',
            borderRadius: '5px',
            margin: '1em 1em'
          }}
          >Close</button>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;


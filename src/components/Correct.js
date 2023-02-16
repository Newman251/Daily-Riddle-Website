import React from 'react';
import styled from 'styled-components';
import Leaderboard from './Leaderboard';

const Correct = () => {

  const currentDate = new Date(new Date().toLocaleString('en', {timeZone: 'Europe/London'}));
  const currentDay = currentDate.getDay() + 21;

  const shareLink = () => {
    navigator.share({
      title: 'Daily Riddles',
      text: '❓I got riddle #' + currentDay.toString() + ', can you❓',
      url: 'https://wriddle.net'
    })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing:', error));
  };

  const StyledButton = styled.button`
background-color: #4CAF50;
border: none;
color: white;
padding: 15px 32px;
text-align: center;
text-decoration: none;
display: inline-block;
font-size: 16px;
margin: 4px 2px;
cursor: pointer;
`;

const Title = styled.h1`
font-size: 1.5em;
text-align: center;
color: #36454f;
`;

  return (
    <div>
      <Title>You got it!!</Title>
      <StyledButton onClick={shareLink}>Share the riddle!</StyledButton>
      <Leaderboard />
    </div>
  );
};

export default Correct;



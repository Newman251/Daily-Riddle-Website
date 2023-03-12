import React from 'react';
import styled from 'styled-components';
import LeaderboardList from './LeaderboardList';

const Correct = ({answer}) => {

  const currentDate = new Date(new Date().toLocaleString('en', {timeZone: 'Europe/London'}));
  const currentDay = currentDate.getDay() + 49;

  const shareLink = () => {
    navigator.share({
      title: 'Daily Riddles',
      text: '❓I got riddle #' + currentDay.toString() + ', can you❓',
      url: 'https://wriddle.net'
    })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing:', error));
  };

const Title = styled.h1`
font-size: 1.5em;
text-align: center;
color: #36454f;
`;

  return (
    <div>
      <Title>You got it!!</Title>
      <button onClick={shareLink}
      style ={{
        background: '#4CAF50',
        border: 'none',
        color: 'white',
        padding: '15px 32px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '16px',
        margin: '4px 2px',
        cursor: 'pointer'
      }}>Share the riddle!</button>
      <LeaderboardList answer = {answer} />
    </div>
  );
};

export default Correct;



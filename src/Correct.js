import React from 'react';
import styled from 'styled-components';

function Correct() {

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

    // Make it bold too

    const Title = styled.h1`
      font-size: 1.5em;
      text-align: center;
      color: palevioletred;
  `;

  const currentDate = new Date();
  const currentDay = currentDate.getDay();

  const shareLink = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Daily Riddles',
        text: '❓I got riddle #'+currentDay.toString()+', can you❓',
        url: "http://wriddle.org/",
      })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing:', error));
    } else {
      prompt("Copy to clipboard: Ctrl+C, Enter", "http://wriddle.org/");
    }
  }

  return (
    <div>
      <Title>You got it!!</Title>
      <StyledButton onClick={shareLink}>Share the riddle!</StyledButton>
    </div>
  );
}

export default Correct;
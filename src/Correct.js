import React from 'react';
import styled from 'styled-components';

function Correct() {
  const currentUrl = 'http://wriddle.org';

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
  const currentDay = currentDate.getDay() + 7;

  const shareLink = () => {
    // if (navigator.share) {
      if ('clipboard' in navigator) {
        navigator.clipboard.writeText('❓I got riddle #'+currentDay.toString()+', can you❓' + currentUrl).then(function() {
          console.log('Riddle text and link copied to clipboard');
        }, function(err) {
          console.error('Failed to copy text: ', err);
        });
      } else {
        // Fallback for browsers that do not support clipboard API
        prompt("Copy to clipboard: Ctrl+C, Enter", '❓I got riddle #'+currentDay.toString()+', can you❓' + currentUrl);
      }
    // } else {
    //   prompt("Copy to clipboard: Ctrl+C, Enter", currentUrl);
    // }
  }

  return (
    <div>
      <Title>You got it!!</Title>
      <StyledButton onClick={shareLink}>Share the riddle!</StyledButton>
    </div>
  );
}

export default Correct;
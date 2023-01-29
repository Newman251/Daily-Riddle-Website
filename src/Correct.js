import React from 'react';
import styled from 'styled-components';
import { RWebShare } from "react-web-share";

function Correct() {
  // const currentUrl = 'http://wriddle.org';

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

  // const shareLink = () => {
  //   // if (navigator.share) {
  //     navigator.share({
  //       title: 'Daily Riddles',
  //       text: '❓I got riddle #'+currentDay.toString()+', can you❓',
  //       url: currentUrl
  //     })
  //       .then(() => console.log('Successful share'))
  //       .catch((error) => console.log('Error sharing:', error));
  //   // } else {
  //   //   prompt("Copy to clipboard: Ctrl+C, Enter", currentUrl);
  //   // }
  // }

  return (
    <div>
      <Title>You got it!!</Title>
      {/* <StyledButton onClick={shareLink}>Share the riddle!</StyledButton> */}
      <RWebShare
        data={{
          text: '❓I got riddle #'+currentDay.toString()+', can you❓',
          url: 'http://wriddle.org',
          title: 'Daily Riddles',
        }}
        onClick={() => console.log("shared successfully!")}
      >
        <StyledButton>Share on Web</StyledButton>
      </RWebShare>
    </div>
  );
}

export default Correct;
import './App.css';
import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import Correct from './Correct';

const App = () => 
{

  const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();	
    const currentSecond = currentDate.getSeconds();
    const hoursLeft = 24 - currentHour - 1;
    const secondsLeft = 60 - currentSecond;
    const minutesLeft = 60 - currentMinute - 1;
    const [timeLeft, setTimeLeft] = useState(hoursLeft * 60 * 60 + minutesLeft * 60 + secondsLeft);
    const [currentRiddle, setCurrentRiddle] = useState("What is able to travel around the globe, but stays in a corner the whole time?");
    const [nextRiddle] = useState("What word becomes shorter when you add two letters to it?");
    const [currentAnswer, setCurrentAnswer] = useState("stamp");
    const [nextAnswer] = useState("short");

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        if (timeLeft === 0) {
            clearInterval(intervalId);
        }

        return () => clearInterval(intervalId);
    }, [timeLeft]);

    const seconds = timeLeft % 60;
    const minutes = Math.floor(timeLeft / 60) % 60;
    const hours = Math.floor(timeLeft / 60 / 60);

    useEffect(() => {
      if (timeLeft === 0) {
        setCurrentRiddle(nextRiddle);
        setCurrentAnswer(nextAnswer);
        setTimeLeft(hoursLeft * 60 * 60 + minutesLeft * 60 + secondsLeft); // reset the timer
      }
    }, [timeLeft, nextRiddle]);

    // Style submit button to be red curve the edges
const Submit = styled.button`
padding: 0.25em 1em;
border-radius: 8px;
background: palevioletred;
margin: 1em;
font-size: 1.5em;
text-align: center;
color: black;
cursor: pointer;
`;

const [inputValue, setInputValue] = useState();
const [isCorrect, setIsCorrect] = useState();

const handleChange = (event) => {
setInputValue(event.target.value);
}

const checkAnswer = (event) => {
  event.preventDefault();
  if (inputValue.toLowerCase() === currentAnswer.toLowerCase()) {
    setIsCorrect(true);
  }
}

  // Style background to be green
  const Title = styled.h1`
    font-size: 1.5em;
    text-align: center;
    color: palevioletred;
`;

// Styple the timer to be fancier make it bold
const Timer = styled.p`
  font-family: "museo", Helvetica Neue, Helvetica, sans-serif;  
  font-size: 1.2em;
  text-align: center;
  color: black;
`;

// Change the text font of the riddle to be fancier
const Text = styled.p`
  @font-face {
    font-family: 'Raleway', sans-serif;
    src: url('https://fonts.googleapis.com/css2?family=Raleway:wght@100&display=swap');
  }
  `;
  
 
  return (
    // Create a div with class name App which contains a text box which you write to
    // and a button which you click to submit the text box contents
    // Add a text box above the button
    <div className="App">
      <Timer>Time unitil next riddle: {hours}:{minutes}:{seconds}</Timer>
        <Title>Daily Riddle</Title>
        {!isCorrect ? ( <><><Text id="text"><i>{currentRiddle}</i></Text><p><input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Enter your answer here"
        style={{
          padding: '2em',
          margin: '2em',
          color: 'palevioletred',
          background: 'papayawhip',
          border: 'none',
          borderRadius: '3px'
        }} /></p><Submit onClick={checkAnswer}>Check</Submit></><p>Keep Guessing!</p></>) : <Correct /> }
      
    </div>
  );
}

export default App;

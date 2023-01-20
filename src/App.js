import './App.css';
import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import Correct from './Correct';

const App = () => 
{

  const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const hoursLeft = 24 - currentHour;
    const [timeLeft, setTimeLeft] = useState(hoursLeft * 60 * 60);

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

// Styled div for background
const Background = styled.div`
background: papayawhip;
`;

const [inputValue, setInputValue] = useState();
const [isCorrect, setIsCorrect] = useState();
const correctAnswerOne = "Fire";
const correctAnswerTwo = "fire";

//   const navigate = useNavigate();

const handleChange = (event) => {
setInputValue(event.target.value);
}

const checkAnswer = (event) => {
if (inputValue === correctAnswerOne || inputValue === correctAnswerTwo) {
  setIsCorrect(true);
}
}

  // Style background to be green
  const Title = styled.h1`
    font-size: 1.5em;
    text-align: center;
    color: palevioletred;
`;

  return (
    // Create a div with class name App which contains a text box which you write to
    // and a button which you click to submit the text box contents
    // Add a text box above the button
    <Background className="App">
      <p>Time Remaining: {hours}:{minutes}:{seconds}</p>
        <Title>Daily Riddle</Title>
        {!isCorrect ? ( <><><text id="text">"I am not alive, but I grow; I don't have lungs, but I need air; I don't have a mouth, but water kills me... What am I?"</text><p><input
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
      
    </Background>
  );
}

export default App;

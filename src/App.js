import './App.css';
import styled from 'styled-components';
import React, { useState, useEffect, useCallback } from 'react';
import Correct from './components/Correct';
import { collection, addDoc } from "firebase/firestore";
import { getDb } from "./services/db.mjs"
import axios from 'axios';
import Menu from './components/Menu.js';
import SetLogo from './components/SetLogo.js';

const riddles = [
  { question: 'I go around all the places, cities, towns, and villages, but never come inside. What am I?', answer: 'street' },
  { question: 'I am higher without a head. What am I?', answer: 'pillow' },
  { question: 'You measure my life in hours and I serve you by expiring. I’m quick when I’m thin and slow when I’m fat. The wind is my enemy. What am I?', answer: 'candle' },
  { question: 'I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?', answer: 'map' },
  { question: 'What is seen in the middle of March and April that can’t be seen at the beginning or end of either month?', answer: 'r' },
  { question: 'What word in the English language does the following: the first two letters signify a male, the first three letters signify a female, the first four letters signify a great, while the entire world signifies a great woman. What is the word? ', answer: 'heroine' },
  { question: 'What disappears as soon as you say its name? ', answer: 'silence' },
  { question: 'Which word becomes shorter when you add 2 letters to it?', answer: 'short' },
  { question: 'I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I? ', answer: 'echo' },
  { question: 'What type of cheese is made backward?', answer: 'edam' },
  { question: 'I can be cracked, I can be made. I can be told, I can be played. What am I?', answer: 'joke' }
];

const App = () => 
{
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();	
    const currentSecond = currentDate.getSeconds();
    const hoursLeft = 24 - currentHour - 1;
    const secondsLeft = 60 - currentSecond;
    const minutesLeft = 60 - currentMinute - 1;
    const currentDay = currentDate.getDay();
    const [timeLeft, setTimeLeft] = useState(hoursLeft * 60 * 60 + minutesLeft * 60 + secondsLeft);
    const [currentRiddle] = useState(riddles[currentDay % riddles.length-2].question);
    const [currentAnswer] = useState(riddles[currentDay % riddles.length-2].answer);
    const [currentPrompt, setCurrentPrompt] = useState('');
    const riddleNumber = currentDate.getDay() + 7;
    const [inputValue, setInputValue] = useState();
    const [isCorrect, setIsCorrect] = useState();
    const calendarDate = currentDate.toLocaleDateString();
    const [correctGuess, setCorrectGuess] = useState();
    const [guess, setGuess] = useState(
      localStorage.getItem("guessCount")
        ? Number(localStorage.getItem("guessCount"))
        : 1
    );
    const [myip,setIP] = useState('');
    const [mycity,setCity] = useState('');
    const seconds = timeLeft % 60;
    const minutes = Math.floor(timeLeft / 60) % 60;
    const hours = Math.floor(timeLeft / 60 / 60);


    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        if (timeLeft === 0) {
            clearInterval(intervalId);
            setGuess(1);
            localStorage.setItem("guessCount", 1);
        }

        return () => clearInterval(intervalId);
    }, [timeLeft]);

    useEffect(() => {
      if (timeLeft === 0) {
        setTimeLeft(hoursLeft * 60 * 60 + minutesLeft * 60 + secondsLeft); // reset the timer
      }
    }, [timeLeft, hoursLeft, minutesLeft, secondsLeft]);


const handleChange = (event) => {
setInputValue(event.target.value);
}
    
//creating function to load ip address from the API
const getData = async()=>{
    const res = await axios.get('https://geolocation-db.com/json/')
    console.log(res.data);
    setIP(res.data.IPv4)
    setCity(res.data.city)
}

useEffect(()=>{
    //passing getData method to the lifecycle method
    getData()
},[])


const checkAnswer = useCallback((event) => {
  event.preventDefault();
  // Search the entire input string to see if the answer is contained anywhere within it
  if (inputValue.toLowerCase().includes(currentAnswer)) {
    setIsCorrect(true);
    setCorrectGuess(guess)
    setGuess(1);
    localStorage.setItem("guessCount", 1);
  } else {
    setGuess(guess + 1);
    localStorage.setItem("guessCount", guess + 1);
  }

  setCurrentPrompt('Keep Guessing!');
  setInputValue("");
  // console.log("Date: " + currentDate);
  // Convert date to calendar date
  // console.log("Date: " + currentDate.toLocaleDateString());
  // // addDoc(collection(getDb(), "users"), {ip: myip, guesses: inputValue, city: mycity, guess_count: guess});
  addDoc(collection(getDb(), "users"), {ip: myip, guesses: inputValue, city: mycity, guess_count: guess, time_left: toString(timeLeft), date: calendarDate, correct_answer: currentAnswer, riddle_number: riddleNumber});

  }, [inputValue, currentAnswer, myip, mycity, guess, timeLeft, calendarDate, riddleNumber]);

  // Function so that when the enter key is pressed, the answer is submitted
useEffect(() => {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      checkAnswer(event);
    }
  }
  document.addEventListener('keydown', handleKeyDown);
  return () => {
    document.removeEventListener('keydown', handleKeyDown);
  }
}, [checkAnswer]);

      // Style submit button to be red curve the edges
const Submit = styled.button`
padding: 0.8em 2.5em;
border-radius: 8px;
background: #36454f;
margin: 0em;
font-size: 1.5em;
text-align: center;
color: white;
cursor: pointer;
`;

// Styple the timer to be fancier make it bold
const Timer = styled.p`
  font-family: "museo", Helvetica Neue, Helvetica, sans-serif;  
  font-size: 1.3em;
  text-align: center;
  color: #36454f;
  font-weight: bold;
  margin-top: 1em;
`;

// Change the text font of the riddle to be fancier
const Text = styled.p`
  @font-face {
    font-family: 'Raleway', sans-serif;
    src: url('https://fonts.googleapis.com/css2?family=Raleway:wght@100&display=swap');
  }
  `;

// Styled italics for the riddle
const Italics = styled.i`
  font-style: italic;
  font-size: 1.3em;
`;

// Styled h1 for the url
const URLStyle = styled.h1`
  font-family: "museo", Helvetica Neue, Helvetica, sans-serif;
  font-size: 0.6em;
  text-align: center;
  color: black;
  font-weight: 150%;
  margin-top: 0em;
`;

  return (
    // Create a div with class name App which contains a text box which you write to
    // and a button which you click to submit the text box contents
    // Add a text box above the button
    <div className="App">
      <Menu />
      <SetLogo />
      <URLStyle>wriddle.net</URLStyle>
      <Timer>Time until next riddle: {hours}:{minutes}:{seconds}</Timer>
        {!isCorrect ? ( <><><Text id="text"><Italics>{currentRiddle}</Italics></Text><p><input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Enter your answer here"
        style={{
          width: '50%',
          height: '2em',
          padding: '1.1em',
          margin: '0.75em',
          color: 'Black',
          fontSize: '1.1em',
          background: 'papayawhip',
          border: '2px solid black',
          borderRadius: '20px'
        }} /></p><Submit onClick={checkAnswer}>Check</Submit></><Timer>{currentPrompt}</Timer></>) : <><Correct /><Timer>Guess Count: {correctGuess}</Timer></> }
    </div>
  );
}

export default App;

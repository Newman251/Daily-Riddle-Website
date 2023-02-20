import './App.css';
import styled from 'styled-components';
import React, { useState, useEffect, useCallback } from 'react';
import Correct from './components/Correct';
import { collection, addDoc, getDocs} from "firebase/firestore";
import { getDb } from "./services/db.mjs"
import axios from 'axios';
import SetLogo from './components/SetLogo.js';
import Buttons from './components/Buttons.js';
import Top from './components/Top.js';

const App = () => 
{
    const currentDate = new Date(new Date().toLocaleString('en', {timeZone: 'Europe/London'}));
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();	
    const currentSecond = currentDate.getSeconds();
    const hoursLeft = 24 - currentHour - 1;
    const secondsLeft = 60 - currentSecond;
    const minutesLeft = 60 - currentMinute - 1;
    const currentDay = currentDate.getDay();
    const [timeLeft, setTimeLeft] = useState(hoursLeft * 60 * 60 + minutesLeft * 60 + secondsLeft);
    const [currentPrompt, setCurrentPrompt] = useState('');
    const riddleNumber = currentDate.getDay() + 28;
    const [inputValue, setInputValue] = useState();
    const [isCorrect, setIsCorrect] = useState();
    const calendarDate = currentDate.toLocaleDateString();
    const [guess, setGuess] = useState(
      localStorage.getItem("guessCount")
        ? Number(localStorage.getItem("guessCount"))
        : 1
    );
    // Create local storage for the date
    const [date] = useState(
      localStorage.getItem("date")
        ? localStorage.getItem("date")
        : calendarDate
    );
    // Local storage for is correct
    const [setCorrect] = useState(
      localStorage.getItem("isCorrect")
        ? Number(localStorage.getItem("isCorrect"))
        : 0
    );
    const [myip,setIP] = useState('');
    const [mycity,setCity] = useState('');
    const [country_name,setCountry] = useState('');
    // Declare seconds, minutes, and hours as state variables, with a 0 before it if it is a single digit
    const seconds = timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60;
    const minutes = Math.floor(timeLeft / 60) % 60 < 10 ? `0${Math.floor(timeLeft / 60) % 60}` : Math.floor(timeLeft / 60) % 60;
    const hours = Math.floor(timeLeft / 60 / 60) < 10 ? `0${Math.floor(timeLeft / 60 / 60)}` : Math.floor(timeLeft / 60 / 60);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        if (timeLeft === 0) {
            clearInterval(intervalId);
        }

        return () => clearInterval(intervalId);
    }, [timeLeft]);

    useEffect(() => {
      if (timeLeft === 0) {
        setTimeLeft(hoursLeft * 60 * 60 + minutesLeft * 60 + secondsLeft); // reset the timer
      }
    }, [timeLeft, hoursLeft, minutesLeft, secondsLeft]);

    const [currentRiddle, setCurrentRiddle] = useState('Loading Riddle...');
    const [currentAnswer, setCurrentAnswer] = useState(' ');

//  Read from the riddles collection and get the answer and riddle of riddle 'Number' 1
    const getRiddle = useCallback(async () => {
      const doc_refs = await getDocs(collection(getDb(), "riddles"))
      // Check the number column and set the current riddle to the riddle of the current day and the current answer to the answer of the current day
      doc_refs.forEach((doc) => {
        if (doc.data().number === (currentDay+1)) {
          setCurrentRiddle(doc.data().riddle);
          setCurrentAnswer(doc.data().answer);
        }
      })
    }, [currentDay]);

    useEffect(() => {
      getRiddle();
    }, [getRiddle]);



const handleChange = (event) => {
setInputValue(event.target.value);
}
    
//creating function to load ip address from the API
const getData = async() =>{

    const res = await axios.get('https://geolocation-db.com/json/')
    setIP(res.data.IPv4)
    setCity(res.data.city)
    setCountry(res.data.country_name)
}

useEffect(()=>{
    //passing getData method to the lifecycle method
    getData()
},[])

const checkAnswer = useCallback((event) => {
  event.preventDefault();

  // Search the entire input string to see if the answer is contained anywhere within it
  if (inputValue.toLowerCase().includes(currentAnswer)) {

    addDoc(collection(getDb(), "users"), {ip: myip, guesses: inputValue, city: mycity, answer: currentAnswer, guessCount: guess, time: `${hours}:${minutes}:${seconds}`, date: calendarDate, riddleNumber: riddleNumber, country: country_name});

    setIsCorrect(true);
    
    // Store local storage is correct as true
    setCorrect(1);
    localStorage.setItem("isCorrect", 1);

  } else {
    setGuess(guess + 1);
    localStorage.setItem("guessCount", guess + 1);
    addDoc(collection(getDb(), "users"), {ip: myip, guesses: inputValue, city: mycity, answer: currentAnswer, guessCount: guess, time: `${hours}:${minutes}:${seconds}`, date: calendarDate, riddleNumber: riddleNumber, country: country_name});
  }

  setCurrentPrompt('Keep Guessing!');
  setInputValue("");

  }, [inputValue, currentAnswer, myip, mycity, guess, riddleNumber, calendarDate, hours, minutes, seconds,  setGuess, country_name, setCorrect]);

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

// Use Effect to check if local storage is correct is true and it is the same date as the current date
useEffect(() => {
  if (localStorage.getItem("isCorrect") === "true" && date === calendarDate) {
    setIsCorrect(true);
  }
}, [date, calendarDate]);

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
      <Buttons answer={currentAnswer}/>
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
        }} /></p><Submit onClick={checkAnswer}>Check</Submit></><Timer>{currentPrompt}</Timer></>) : <><Top time={timeLeft} answer={currentAnswer}/><Correct answer = {currentAnswer}/></> }
    </div>
  );
}

export default App;

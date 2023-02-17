import './App.css';
import styled from 'styled-components';
import React, { useState, useEffect, useCallback } from 'react';
import Correct from './components/Correct';
import { collection, addDoc, getDocs, deleteDoc} from "firebase/firestore";
import { getDb } from "./services/db.mjs"
import axios from 'axios';
import SetLogo from './components/SetLogo.js';
import Buttons from './components/Buttons.js';
import Top from './components/Top.js';


const riddles = [
  { question: 'When you need me, you throw me away. When you don’t need me, you bring me back. What am I? ', answer: 'anchor' },
  { question: 'What is seen in the middle of March and April that can’t be seen at the beginning or end of either month?', answer: 'r' },
  { question: 'I am vast and billowing, a cloth so grand, I help my owner take command. What am I, a cloth so light, that helps you take flight? ', answer: 'sail' },
  { question: 'Between two or more, I bring you together or cause you to soar. Light and fun, or serious and deep, I help you connect, or put you to sleep. What am I? ', answer: 'conversation' },
  { question: 'A motion made with ease. Strong, or gentle, as you please. Mix or stir, I can also signal, that its time to concur. What am I? ', answer: 'shake' },
  { question: 'Lift or hold, never get old, a force thats felt, with each passing day, a crucial factor, in every way. What am I, this thing you cant see, a necessary part, of you and me? ', answer: 'weight' },
  { question: 'Lose me once ill come back stronger, lose me twice ill leave forever, what am I? ', answer: 'tooth' },
  { question: 'I live for but a single breath. Any touch could spell my death. A rainbow spins within my eye. Make me right, and I can fly ', answer: 'bubble' },
  { question: 'I might come through your window, And Im often at the bar. Sometimes Im used to send your kids To die in lands afar. ', answer: 'draft' },
  { question: 'As a stone inside a tree, Ill help your words outlive thee. But if you push me as I stand, the more I move the less I am. What am I? ', answer: 'pencil' },
  { question: 'Something to find, a test of the mind. What am I, this enigma so fine, a source of confusion, yet also a sign? ', answer: 'riddle' },
  { question: 'You get me when you park in a place off limits. I live in a swamp. I m the one who ribbits. ', answer: 'toad' },
  { question: 'So divine, its a pleasure to swine, Its color is rich, sometimes deep and bold, Sought after, by both young and old. What am I in your figure-like glass, that can make your day pass? ', answer: 'wine' },
  { question: 'I am small and round, often fastened tight, I play a big role in making things right. With just one press, I bring relief, Making life much easier, like a sweet reprieve. What am I?', answer: 'button' },
  { question: 'Holding thoughts with grace, in a special place. A gentle touch or flipped with flair and I’ll show you what’s there. What am I?', answer: 'page' },
  { question: 'What kind of coat is always wet when you put it on?  ', answer: 'paint' },
  { question: 'Two girls were born to the same mother, on the same day, at the same time, in the same month, and in the same year—but theyre not twins. How is this possible? ', answer: 'triplets' },
  { question: 'A bus driver goes the wrong way on a one-way street. He passes the cops, but they don’t stop him. Why? ', answer: 'walk' },
  { question: 'I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I? ', answer: 'echo' },
  { question: 'Which word becomes shorter when you add 2 letters to it?', answer: 'short' },
  { question: 'What type of cheese is made backward?', answer: 'edam' },
  { question: 'I can be cracked, I can be made. I can be told, I can be played. What am I?', answer: 'joke' },
  { question: 'What is 3/7 chicken, 2/3 cat, and 1/2 goat? ', answer: 'chicago' },
  { question: 'What English word has three consecutive double letters? ', answer: 'bookkeeper' }

];

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
    const [currentRiddle] = useState(riddles[currentDay % riddles.length].question);
    const [currentAnswer] = useState(riddles[currentDay % riddles.length].answer);
    const [currentPrompt, setCurrentPrompt] = useState('');
    const riddleNumber = currentDate.getDay() + 21;
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
const getData = async() =>{
      console.log("Hello")

    const res = await axios.get('https://geolocation-db.com/json/')
    console.log(res.data);
    setIP(res.data.IPv4)
    setCity(res.data.city)
    setCountry(res.data.country_name)
}

useEffect(()=>{
    //passing getData method to the lifecycle method
    getData()
},[])


// Wrap the clearAll function in a callback
const clearAll = useCallback(async () => {
  console.log("Finding all")
  const doc_refs = await getDocs(collection(getDb(), "leaderboard"))
  console.log("Gotlboard")

    // Get the answer column from the leaderboard collection
  const answer = doc_refs.docs.map(doc => doc.data().answer)
  // Log the first answer
  console.log(answer[0])
  // Check if the answer is not the same as the current answer
  if (answer[0] !== currentAnswer) {
    // Delete all documents in the leaderboard collection
    const querySnapshot = await getDocs(collection(getDb(), "leaderboard"));
    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });
    console.log("Deleted all")
  }
}, [currentAnswer]);


const checkAnswer = useCallback((event) => {
  event.preventDefault();

  // Check answer in the leaderboard collection
  clearAll();

  // Search the entire input string to see if the answer is contained anywhere within it
  if (inputValue.toLowerCase().includes(currentAnswer)) {

    

    addDoc(collection(getDb(), "users"), {ip: myip, guesses: inputValue, city: mycity, answer: currentAnswer, guessCount: guess, time: `${hours}:${minutes}:${seconds}`, date: calendarDate, riddleNumber: riddleNumber, country: country_name});

    setIsCorrect(true);
    
    // Store local storage is correct as true
    setCorrect(1);
    localStorage.setItem("isCorrect", 1);

    // Set Guess Count to 1
    setGuess(1);
    localStorage.setItem("guessCount", 1);

  } else {
    setGuess(guess + 1);
    localStorage.setItem("guessCount", guess + 1);
    addDoc(collection(getDb(), "users"), {ip: myip, guesses: inputValue, city: mycity, answer: currentAnswer, guessCount: guess, time: `${hours}:${minutes}:${seconds}`, date: calendarDate, riddleNumber: riddleNumber, country: country_name});
  }

  setCurrentPrompt('Keep Guessing!');
  setInputValue("");

  }, [inputValue, currentAnswer, myip, mycity, guess, riddleNumber, calendarDate, hours, minutes, seconds,  setGuess, clearAll, country_name, setCorrect]);

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
    console.log("Correct")
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
      <Buttons />
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
        }} /></p><Submit onClick={checkAnswer}>Check</Submit></><Timer>{currentPrompt}</Timer></>) : <><Top time={timeLeft} answer={currentAnswer}/><Correct /></> }
    </div>
  );
}

export default App;

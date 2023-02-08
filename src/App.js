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
  { question: 'If eleven plus two equals one, what does nine plus seven equal? ', answer: 'four'||'4' },
  { question: 'What is so fragile that saying its name breaks it?', answer: 'silence' },
  { question: 'Mike and Pat are in a desert. They both have packs on. Pat is dead. Mike, who is alive, has his pack open. Pat has his pack closed. What is in the packs? ', answer: 'parachute' },
  { question: 'If a zookeeper had 100 pairs of animals in her zoo, and two pairs of babies are born for each one of the original animals, then (sadly) 23 animals dont survive, how many animals do you have left in total? ', answer: '977' },
  { question: 'Follower of man, Dark as night, A trained Choreographer, Comes after light. What am I?  ', answer: 'shadow' },
  { question: 'What kind of coat is always wet when you put it on?  ', answer: 'paint' },
  { question: 'What runs, but never walks. Murmurs, but never talks. Has a bed, but never sleeps. And has a mouth, but never eats?  ', answer: 'river' },
  { question: 'Two girls were born to the same mother, on the same day, at the same time, in the same month, and in the same year—but theyre not twins. How is this possible? ', answer: 'triplets' },
  { question: 'What is 3/7 chicken, 2/3 cat, and 1/2 goat? ', answer: 'chicago' },
  { question: 'What is seen in the middle of March and April that can’t be seen at the beginning or end of either month?', answer: 'r' },
  { question: 'A bus driver goes the wrong way on a one-way street. He passes the cops, but they don’t stop him. Why? ', answer: 'walk' },
  { question: 'I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I? ', answer: 'echo' },
  { question: 'What disappears as soon as you say its name? ', answer: 'silence' },
  { question: 'Which word becomes shorter when you add 2 letters to it?', answer: 'short' },
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
    const [currentRiddle] = useState(riddles[currentDay % riddles.length].question);
    const [currentAnswer] = useState(riddles[currentDay % riddles.length].answer);
    const [currentPrompt, setCurrentPrompt] = useState('');
    const riddleNumber = currentDate.getDay() + 14;
    const [inputValue, setInputValue] = useState();
    const [isCorrect, setIsCorrect] = useState();
    const calendarDate = currentDate.toLocaleDateString();
    const [setCorrectGuess] = useState();
    const [guess, setGuess] = useState(
      localStorage.getItem("guessCount")
        ? Number(localStorage.getItem("guessCount"))
        : 1
    );
    // Create local storage for the date
    const [date, setDate] = useState(
      localStorage.getItem("date")
        ? localStorage.getItem("date")
        : calendarDate
    );
    const [myip,setIP] = useState('');
    const [mycity,setCity] = useState('');
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
  // Check if the local storage date is not the same as the current date
  if (date !== calendarDate) {
    // Set the local storage date to the current date
    setDate(calendarDate);
    // Restart the guess count
    setGuess(1);
    localStorage.setItem("guessCount", 1);
  }
  // Search the entire input string to see if the answer is contained anywhere within it
  if (inputValue.toLowerCase().includes(currentAnswer)) {

    // Check answer in the leaderboard collection
    clearAll();

    // Get guess count from local storage
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
  addDoc(collection(getDb(), "users"), {ip: myip, guesses: inputValue, city: mycity, answer: currentAnswer, guessCount: guess, time: `${hours}:${minutes}:${seconds}`, date: calendarDate, riddleNumber: riddleNumber});

  }, [inputValue, currentAnswer, myip, mycity, guess, riddleNumber, calendarDate, hours, minutes, seconds, date, setGuess, setCorrectGuess, clearAll]);

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

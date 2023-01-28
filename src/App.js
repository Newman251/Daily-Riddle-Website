import './App.css';
import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import Correct from './Correct';
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore"; 
// import UserList from './components/user-list.js'
import { collection, addDoc } from "firebase/firestore";
import { getDb } from "./services/db.mjs"
import axios from 'axios';


const riddles = [
  { question: 'What kind of ship has two mates but no captain?', answer: 'relationship' },
  { question: 'What is there one of in every corner and two of in every room?', answer: 'o' },
  { question: 'Who can finish a book without finishing a sentence?', answer: 'prisoner' },
  { question: 'I Start with M, end with X, and have a never-ending amount of letters. What am I?', answer: 'mailbox' },
  { question: 'What is full of holes but still holds water?', answer: 'sponge' },
  { question: 'What can you break, even if you never pick it up or touch it?', answer: 'promise' },
  { question: 'I shave every day, but my beard stays the same. What am I?', answer: 'barber' },
  { question: 'What word is always spelled wrong?', answer: 'wrong' },
  { question: 'What kind of ship has two mates but no captain?', answer: 'relationship' },
  { question: 'I go around all the places, cities, towns, and villages, but never come inside. What am I?', answer: 'street' },
  { question: 'I am higher without a head. What am I?', answer: 'pillow' },
  { question: 'What type of cheese is made backward?', answer: 'edam' },
  { question: 'If you drop a yellow hat in the Red Sea, what does it become?', answer: 'wet' },
  { question: 'Which word becomes shorter when you add 2 letters to it?', answer: 'short' },
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
        setTimeLeft(hoursLeft * 60 * 60 + minutesLeft * 60 + secondsLeft); // reset the timer
      }
    }, [timeLeft, hoursLeft, minutesLeft, secondsLeft]);

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
// const [ newUser, setNewUser ] = useState("")

const handleChange = (event) => {
setInputValue(event.target.value);
}

// const findAll = async () => {
//   const doc_refs = await getDocs(collection(getDb(), "users"))

//   const res = []
  

//   doc_refs.forEach(users => {
//       res.push({
//           id: users.id, 
//           ...users.data()
//       })
//   })

//   return res
// }

//creating IP state
const [myip,setIP] = useState('');
    
//creating function to load ip address from the API
const getData = async()=>{
    const res = await axios.get('https://geolocation-db.com/json/')
    console.log(res.data);
    setIP(res.data.IPv4)
}

useEffect(()=>{
    //passing getData method to the lifecycle method
    getData()
},[])

const checkAnswer = (event) => {
  event.preventDefault();
  if (inputValue.toLowerCase() === currentAnswer.toLowerCase()) {
  setIsCorrect(true);
  }
  setInputValue("");
  
  addDoc(collection(getDb(), "users"), {ip: myip, guesses: "TODO"});

  }

// const checkAnswer = (event) => {
//   event.preventDefault();
//   if (inputValue.toLowerCase() === currentAnswer.toLowerCase()) {
//     setIsCorrect(true);
//   }
//   setInputValue("");
//   
// }

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
  
  // let db = false;

    // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  // const firebaseConfig = {
  //   apiKey: "AIzaSyD9oy26wC2XocjF_CxAjECA807QlKDpydE",
  //   authDomain: "riddle-81547.firebaseapp.com",
  //   projectId: "riddle-81547",
  //   storageBucket: "riddle-81547.appspot.com",
  //   messagingSenderId: "385825049434",
  //   appId: "1:385825049434:web:5911062c7907a291f14163",
  //   measurementId: "G-16DLPGEBY2"
  // };

  // Initialize Firebase
  // const app = initializeApp(firebaseConfig);

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
        <h2>Your IP Address is</h2>
            <h4>{myip}</h4>
        {/* <UserList/> */}
      
    </div>
  );
}

export default App;

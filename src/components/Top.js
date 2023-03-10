import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { addDoc, collection, getDocs } from "firebase/firestore";
import { getDb } from "../services/db.mjs";
import Correct from "./Correct.js";

const Top = ({ time, answer }) => {
  
  // Styled h1 to change the font size
  const StyledH1 = styled.h1`
  font-size: 0.6em;
  text-align: center;
  color: #36454f;
  `;
  
const handleChange = (e) => {
    setUsername(e.target.value);
  }
  const [username, setUsername] = useState('');
  const [showPrompt, setShowPrompt] = useState(false);
  

  const handleUsernameSubmit = async (event) => {
    event.preventDefault();
    // Add the username to the leaderboard collection
    setShowPrompt(false);
    if (username !== '') {
      await addDoc(collection(getDb(), "leaderboard"), { name: username, time: time, answer: answer });
    }
  };

  useEffect(() => {
    const checkSize = async () => {
      console.log(answer);
      const docRefs = await getDocs(collection(getDb(), "leaderboard"));
      const answerDocs = docRefs.docs.filter(doc => doc.data().answer === answer);
      if (answerDocs.length < 5) {
        setShowPrompt(true);
      }
    };
    checkSize();
  }, [answer]);


  return (
    <div>
      {showPrompt ? (
        <div 
        style={
          {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: '1',
            display: 'flex',
            flexDirection: 'column',
            margin: '0',
            listStyle: 'none',
            backgroundColor: '#f5f5dc',
            border: '0.1px solid #ccc',
            borderRadius: '2px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            padding: '6em',
          }
        }>
          <StyledH1>You are a top 5 riddler today! Enter your name to feature on the leaderboard!</StyledH1>
          <p>
            <input
              type="text"
              value={username}
              onChange={handleChange}
              placeholder="Your Name"
              style={{
                width: '60%',
                height: '1.2em',
                padding: '1.1em',
                color: 'Black',
                fontSize: '1.1em',
                background: 'White',
                border: '2px solid black',
                borderRadius: '20px'
              }}
            />
          </p>
          <button onClick={handleUsernameSubmit} 
          style = {{
            background: 'Gray',
            font:'3em',
            color: '#36454f',
            padding: '1em 4em',
            border: '1px solid black',
            borderRadius: '5px',
            margin: '1em 1em'
          }}
          >Close</button>
        </div>
      ) : ( <Correct answer={answer} /> )}
    </div>
  )
}

export default Top;
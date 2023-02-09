import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { addDoc, collection, getDocs } from "firebase/firestore";
import { getDb } from "../services/db.mjs";

const Top = ({ time, answer }) => {

  // Styled the button
  const CloseButton = styled.button`
  background-color: Gray;
  border: 1px solid transparent;
  font-size: 2em;
  font-weight: 5;
  color: #36454f;
  padding: 0.25em 0.5em;
  border-radius: 5px;
  margin: 1em 1em;
  cursor: pointer;
  &:hover {
      background-color: #f2f2f2;
  }  
  `;
  
  // Styled h1 to change the font size
  const StyledH1 = styled.h1`
  font-size: 0.75em;
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
    await addDoc(collection(getDb(), "leaderboard"), { name: username, time: time, answer: answer });
  };

  useEffect(() => {
    const checkSize = async () => {
      const docRefs = await getDocs(collection(getDb(), "leaderboard"));
      if (docRefs.size < 4) {
        setShowPrompt(true);
      }
    };
    checkSize();
  }, []);


  return (
    <div>
      {showPrompt && (
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
          <StyledH1>Congrats! You are a top five riddler today, enter your name to feature on the leaderboard!</StyledH1>
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
                margin: '0.75em',
                color: 'Black',
                fontSize: '1.1em',
                background: 'White',
                border: '2px solid black',
                borderRadius: '20px'
              }}
            />
          </p>
          <CloseButton onClick={handleUsernameSubmit}>Enter</CloseButton>
        </div>
      )}
    </div>
  )
}

export default Top;
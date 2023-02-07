import { useState, useEffect } from "react";
import styled from 'styled-components';
import { addDoc, collection, getDocs } from "firebase/firestore";
import { getDb } from "../services/db.mjs";

function Top() {

    const PopupContainer = styled.div`
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
z-index: 1;
display: flex;
flex-direction: column;
padding: 0;
margin: 0;
list-style: none;
background-color: #f5f5dc;
border: 0.1px solid #ccc;
border-radius: 2px;
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
padding: 8em;
`;

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

// Styled input 
const StyledInput = styled.input`
font-size: 1em;
text-align: center;
color: #36454f;
padding: 0.25em 0.5em;
border-radius: 5px;
margin: 1em 1em;
`;

const [username, setUsername] = useState('');

const handleUsernameSubmit = async (event) => {
    event.preventDefault();
    // Add the username to the leaderboard collection
    const currentDate = new Date();
    const currentTime = currentDate.toLocaleString();
    await addDoc(collection(getDb(), "leaderboard"), { name: username, time: currentTime });
    setShowPrompt(false);
  };

  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const checkSize = async () => {
      const docRefs = await getDocs(collection(getDb(), "leaderboard"));
      if (docRefs.size < 5) {
        setShowPrompt(true);
      }
    };
    checkSize();
  }, []);

    return (
        <div>{showPrompt && (
          <PopupContainer onSubmit={handleUsernameSubmit}>
              <StyledH1>Congrats! You are a top five riddler today, enter your name to feature on the leaderboard!</StyledH1>
              <StyledInput type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
              <CloseButton type="submit">Enter</CloseButton>
            </PopupContainer>
            )}
        </div>
      )
}

export default Top;
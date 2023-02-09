import React, { useState} from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import { getDocs, collection } from "firebase/firestore"; 
import { getDb } from "../services/db.mjs"

const Leaderboard = () => {
  const [names, setNames] = useState([]);
  const [showLeaderboards, setShowLeaderboards] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setNames([]);
    findAll();
    setShowLeaderboards(!showLeaderboards);
  };

  const findAll = async () => {
    setLoading(true);
    const doc_refs = await getDocs(collection(getDb(), "leaderboard"))

    // Get a an array of each time in the leaderboard
    const times = doc_refs.docs.map(doc => doc.data().time)
    // Get a an array of each name in the leaderboard
    const name = doc_refs.docs.map(doc => doc.data().name)

    // Sort the names array in order of the times array
    for (let i = 0; i < times.length; i++) {
      for (let j = 0; j < times.length; j++) {
        if (times[i] > times[j]) {
          let temp = times[i];
          times[i] = times[j];
          times[j] = temp;
          temp = name[i];
          name[i] = name[j];
          name[j] = temp;
        }
      }
    }
  
    // Use setNames to set the names array to the state
    setNames(name)

    console.log("Gotlboard")
    setLoading(false);

}

// Style the popup container and make it wider
const PopupContainer = styled.div`
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
z-index: 1;
flex-direction: column;
padding: 0;
margin: 0;
list-style: none;
background-color: #f5f5dc;
border: 0.1px solid #ccc;
box-shadow: 0 2px 18px rgba(0, 0, 0, 0.15);
padding: 2em;
`;

// Style the Icon
const StyledIcon = styled(Icon)`
font-size: 2em;
background-color: transparent;
color: #36454f;
`;

// Leaderboard button on the left side of the screen, inline with the menu button
const LeaderboardButton = styled.button`
display: inline-block;
background-color: transparent;
border: 1px solid transparent;
font-size: 1em;
margin: 1em 1em;
top: 0.1em;
right: 77%;

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

// Styled h1 for the leaderboard
const StyledH1 = styled.h1`
font-size: 1em;
color: #36454f;
padding: 3em 10em;
border-radius: 20px;
margin: 1em 1em;
`;

// Stype the p tag to make it thicker
const StyledP = styled.p`
font-size: 1em;
color: #36454f;
border-radius: 2px;
margin: 1em 1em;
font-weight: 500;
font-family: 'Courier New', Courier, monospace;
`;

  return (
    <div>
      <LeaderboardButton onClick={handleClick}>
        <StyledIcon icon="ic:round-leaderboard" />
      </LeaderboardButton>
      {showLeaderboards && (
        <PopupContainer>
          <><StyledH1>Top Wriddlers</StyledH1><p>
              {loading && 
              <StyledP>
                Loading...
              </StyledP>
                }
            {names.map((name, index) => (
              <StyledP>{index + 1}. {name}</StyledP>
            ))}
          </p></>
          <CloseButton onClick={handleClick}>Close</CloseButton>
        </PopupContainer>
      )}
    </div>
  );
};

export default Leaderboard;


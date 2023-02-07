import React, { useState} from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import { getDocs, collection } from "firebase/firestore"; 
import { getDb } from "../services/db.mjs"

const Leaderboard = () => {
  const [names, setNames] = useState([]);
  const [showLeaderboards, setShowLeaderboards] = useState(false);

  const handleClick = () => {
    setNames([]);
    findAll();
    setShowLeaderboards(!showLeaderboards);
  };

  const findAll = async () => {
    console.log("Finding all")
    const doc_refs = await getDocs(collection(getDb(), "leaderboard"))
    console.log("Gotlboard")

    // const res = []

    // Print the contents of each ip
    doc_refs.forEach(users => {
        console.log(users.data())
        setNames(names => [...names, users.data().name.toString()+": "+users.data().time.toString()])
        // Read each value in the collection
        console.log(users.data().name)
        console.log(users.data().time.toString())
        // Print the size of the collection
        console.log("Size of collection: ", doc_refs.size)
    })
}


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
    padding: 5em;
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
    font-size: 2em;
    color: #36454f;
    padding: 1em 1em;
    border-radius: 20px;
    margin: 1em 1em;
`;


  return (
    <div>
      <LeaderboardButton onClick={handleClick}>
        <StyledIcon icon="ic:round-leaderboard" />
      </LeaderboardButton>
      {showLeaderboards && (
        <PopupContainer>
          <><StyledH1>Top Wriddlers:</StyledH1> Coming soon!<p>
            {names.map((name, index) => (
              <p>{index + 1}. {name}</p>
            ))}
          </p></>
          <CloseButton onClick={handleClick}>Close</CloseButton>
        </PopupContainer>
      )}
    </div>
  );
};

export default Leaderboard;
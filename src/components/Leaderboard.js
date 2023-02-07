import React, { useState } from 'react';
// import { Icon } from '@iconify/react';
import styled from 'styled-components';

const Leaderboard = () => {
  const [names, setNames] = useState(["John", "Jane", "Joe"]);
  const [showLeaderboards, setShowLeaderboards] = useState(false);

  const handleClick = () => {
    setShowLeaderboards(!showLeaderboards);
  };

//   const addName = (name) => {
//     setNames([...names, name]);
//   };

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
    padding: 10em;
`;

    return (
        <div>
        <button onClick={handleClick}>Show Leaderboards </button>
        
        {showLeaderboards && (
            <PopupContainer>
        <><h1>Leaderboard</h1><p>
                        {names.map((name, index) => (
                            <p>{index + 1}. {name}</p>
                        ))}
                    </p></>
                    </PopupContainer>
        )}
        
        </div>
        );
        };

export default Leaderboard;



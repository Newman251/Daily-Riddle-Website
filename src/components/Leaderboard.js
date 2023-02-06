import React, { useState } from 'react';
// import { Icon } from '@iconify/react';
import styled from 'styled-components';

const Leaderboard = () => {
  const [names, setNames] = useState(["John", "Jane", "Joe"]);

//   const addName = (name) => {
//     setNames([...names, name]);
//   };

  // Style the leaderboard
    const StyledBoard = styled.div`
    display: center;
    margin-top: 0em;
    width: 100%;
    height: 240%;
    `;


  return (
    <StyledBoard>
        {/* <p> Icon = </p> */}
        <h1>Leaderboard</h1>
        <p>
            {names.map((name) => (
                <p>{name}</p>
            ))}
        </p>

    </StyledBoard>
  );
};

export default Leaderboard;
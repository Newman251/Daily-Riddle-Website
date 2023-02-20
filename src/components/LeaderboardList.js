import React from 'react';
import styled from 'styled-components';
import { getDocs, collection } from "firebase/firestore";
import { getDb } from "../services/db.mjs";
import { useEffect, useState } from 'react';

// Stype the p tag to make it thicker
const StyledP = styled.p`
font-size: 1.1em;
color: #36454f;
border-radius: 2px;
margin: 1em 1em;
font-weight: 1000;
font-family: 'Courier New', Courier, monospace;
`;


// Change Stled H1 to styled p, underlining the text
const StyledH1 = styled.p`
font-size: 1em;
color: #36454f;
border-radius: 10px;
margin: 1.6em 0em;
font-weight: 1000;
text-decoration: underline;
`;

function LeaderboardList({answer}) {

const [names, setNames] = useState([]);
const [loading, setLoading] = useState(false);

// const findAll = async () => {
//   setLoading(true);
//   // Get the names and times from the leaderboard collection where answer is equal to the answer, having it refresh every few seconds
//   const docRefs = await getDocs(collection(getDb(), "leaderboard"));

//   // Filter the docs to only include the docs where the answer is equal to the answer
//   const answerDocs = docRefs.docs.filter(doc => doc.data().answer === answer);

//   // Create two arrays, one for the names and one for the times
//   let name = [];
//   let times = [];
//   answerDocs.forEach(doc => {
//     name.push(doc.data().name);
//     times.push(doc.data().time);
//   });

//   // Sort the names array in order of the times array
//   for (let i = 0; i < times.length; i++) {
//     for (let j = 0; j < times.length; j++) {
//       if (times[i] > times[j]) {
//         let temp = times[i];
//         times[i] = times[j];
//         times[j] = temp;
//         temp = name[i];
//         name[i] = name[j];
//         name[j] = temp;
//       }
//     }
//   }

//   // Use setNames to set the names array to the state
//   setNames(name)

//   console.log("Gotlboard")
//   setLoading(false);
// }

// Wrap the findAll in a useCallback hook to prevent it from being recreated every time the component renders
const findAll = React.useCallback(async () => {
  setLoading(true);
  // Get the names and times from the leaderboard collection where answer is equal to the answer, having it refresh every few seconds
  const docRefs = await getDocs(collection(getDb(), "leaderboard"));
  
  // Filter the docs to only include the docs where the answer is equal to the answer
  const answerDocs = docRefs.docs.filter(doc => doc.data().answer === answer);

  // Create two arrays, one for the names and one for the times
  let name = [];
  let times = [];
  answerDocs.forEach(doc => {
    name.push(doc.data().name);
    times.push(doc.data().time);
  });

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
}, [answer]);


useEffect(() => {
  findAll();
  // Refresh the leaderboard every 5 seconds
  const interval = setInterval(() => {
    findAll();
  }
  , 25000);
  return () => clearInterval(interval);
}, [setLoading, findAll]);


  return (
    <div>
      <><StyledH1>Top Wriddlers</StyledH1><p>
          </p></>
        {loading && 
              <StyledP>
                Loading...
              </StyledP>
                }
            {names.map((name, index) => (
              <StyledP>{index + 1}. {name}</StyledP>
            ))}
    </div>
  );
}

export default LeaderboardList;













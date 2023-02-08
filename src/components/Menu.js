import React, { useState } from 'react';
import { Icon } from '@iconify/react';
// import menuRounded from '@iconify/icons-material-symbols/menu-rounded';
import styled from 'styled-components';

const DropdownContainer = styled.div`
  size: 50%;
  font-size:0.5em;
  font-weight: 1000;
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  display: inline-block;
  margin-left: 11em;
  margin-top: 0.5em;
  size: 100%;
  background-color: transparent;
  border: 1px solid transparent;
  font-size: 2.4em;
`;

const DropdownList = styled.ul`
    position: absolute;
    top: 80%;
    left: 24em;
    z-index: 0.5;
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
    list-style: none;
    background-color: light-gray;
    border: 0.1px solid #ccc;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

const DropdownItem = styled.li`
  padding: 8px 10px;
  &:hover {
    background-color: #f2f2f2;
  }
  
`;

// Style the Icon
const StyledIcon = styled(Icon)`
    font-size: 2em;
    background-color: transparent;
    color: #36454f;
`;

const PopupContainer = styled.div`
    position: absolute;
    top: 500%;
    left: 40%;
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
    padding: 4em;
`;

// Styled the button
const Button = styled.button`
    background-color: Gray;
    border: 1px solid transparent;
    font-size: 5em;
    font-weight: 1000;
    color: #36454f;
    padding: 0.25em 1em;
    border-radius: 3px;
    margin: 1em 1em;
    cursor: pointer;
    &:hover {
        background-color: #f2f2f2;
    }
    
`;

// Styled p
const StyledP = styled.p`
    font-size: 1.5em;
    font-weight: 1000;
    color: #36454f;
    padding: 0.25em 1em;
    border-radius: 3px;
    margin: 0.5em 1em;
    cursor: pointer;
`;


function Menu() {
    const [showMenu, setShowMenu] = useState(false);
    const [showPopup, setShowPopup] = useState({
    display: false,
    content: ''
    });

  
    const handleClick = option => {
      setShowPopup({
        display: true,
        content: option
      });
    };

  return (
    <DropdownContainer>
      <DropdownButton onClick={() => setShowMenu(!showMenu)}>
        <StyledIcon icon="material-symbols:menu-rounded" />
      </DropdownButton>
      {showMenu && (
        <DropdownList>
          <DropdownItem onClick={() => handleClick('Settings yet to be implemented. If you have any suggestions, email wriddledaily@gmail.com')}>Settings</DropdownItem>
          <DropdownItem onClick={() => handleClick('Guess the riddle! A new one appears every day. Think outside the box, or inside the box...')}>How to Play</DropdownItem>
          <DropdownItem onClick={() => handleClick('Website created in Dublin, Ireland. For enquiries, email - wriddledaily@gmail.com')}>Credits</DropdownItem>
        </DropdownList>
      )}
      {showPopup.display && (
        <PopupContainer>
          <StyledP>{showPopup.content}</StyledP>
          <Button onClick={() => setShowPopup({ display: false, content: '' })}>Close</Button>
        </PopupContainer>
      )}
    </DropdownContainer>
    
  );
}

export default Menu;
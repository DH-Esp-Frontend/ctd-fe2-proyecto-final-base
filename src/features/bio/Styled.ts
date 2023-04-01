import styled from 'styled-components';

interface BotonBio {
  isActive?: boolean;
}

export const BotonBio = styled.button<BotonBio>`
  border-radius: 5px;
  border: 1px solid darkgray;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
  padding: 1rem;
  margin: 1rem;
  font-family: "Homer Simpson Revised", sans-serif;
  font-size: 1.4rem;
  background-color: ${({isActive}) => isActive ? "#fdd835": ""};
  color: ${({isActive}) => isActive ? "whitesmoke" : ""};
  text-shadow: ${({isActive}) => isActive ? "2px 2px 0 #000000, 2px -2px 0 #000000, -2px 2px 0 #000000,    -2px -2px 0 #000000, 2px 0px 0 #000000, 0px 2px 0 #000000,    -2px 0px 0 #000000, 0px -2px 0 #000000" : "" };
  `;



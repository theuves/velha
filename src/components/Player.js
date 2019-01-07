import React from 'react'
import styled from 'styled-components'

// Calculate the hypotenuse of an isosceles triangle.
const calcHyp = (leg) => Math.sqrt(leg ** 2 * 2)

const StyledPlayerX = styled.div`
  position: relative;
  display: inline-block;
  width: ${props => props.width || 1}px;
  height: ${props => props.width || 1}px;
  background-color: transparent;
  
  &::before,
  &::after {
    content: "";
    position: absolute;
    display: block;
    width: ${props => calcHyp(props.width || 1) - props.lineWidth || 1}px;
    height: ${props => props.lineWidth}px;
    left: 50%;
    top: 50%;
    transform-origin: left top;
    background-color: ${props => props.color || 'black'};
  }
  &::before {
    /* From left to right.
       From bottom to top. */
    transform: rotate(45deg) translate(-50%, -50%);
  }
  &::after {
    /* From right to left.
       From top to bottom. */
    transform: rotate(-45deg) translate(-50%, -50%);
  }
`

const StyledPlayerO = styled.div`
  display: inline-block;
  width: ${props => props.width || 1}px;
  height: ${props => props.width || 1}px;
  box-sizing: border-box;
  border-radius: 50%;
  border-style: solid;
  border-color: ${props => props.color || 'black'};
  border-width: ${props => props.lineWidth || 1}px;
  background-color: transparent;
` 

const Player = ({playerName, ...props}) => {
  switch (playerName) {
    case 'x':
      return <StyledPlayerX {...props} />
      break
    case 'o':
      return <StyledPlayerO {...props} />
      break
    default:
      throw new Error('Invalid player name')
  }
}

export default Player
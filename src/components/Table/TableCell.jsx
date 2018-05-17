import React from "react";
import styled from "styled-components";

// components
import Player from "../Player/index.jsx";

const TableCell = styled.div`
  width: ${props => props.size};
  height: ${props => props.size};
  position: relative;
  background-color: white;
`;

const Center = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

function This({
  color,
  player,
  size,
  onClick,
  borders: border,
}) {
  const PERCENTAGE = 64;
  const playerSize = PERCENTAGE * size / 100;
  size += "px";

  return (
    <TableCell
      size={size}
      onClick={onClick}
    >
      <Center>
        <Player
          border={border}
          color={color}
          name={player}
          size={playerSize}
        />
      </Center>
    </TableCell>
  );
}

export default This;
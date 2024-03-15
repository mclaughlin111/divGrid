import React, { useState, useEffect } from "react";
import './App.css';

function NodeGrid() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const generateNodes = () => {
    const nodes = [];
    const gridSize = 8; // Change this value to adjust the grid size

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        nodes.push(
          <div
            key={`${i}-${j}`}
            className="node"
            style={{
              transform: `rotate(${calculateRotation(i, j)}deg)`,
              width: `${calculateWidth(i, j)}px`
            }}
          ></div>
        );
      }
    }

    return nodes;
  };

  const calculateRotation = (i, j) => {
    // Calculate the center of the node
    const nodeCenterX = i * 25 + 12.5; // Adjusted for node width (10px) and gap (5px)
    const nodeCenterY = j * 25 + 12.5; // Adjusted for node height (5px) and gap (5px)

    // Calculate the angle between the cursor and the node center
    const deltaX = cursorPosition.x - nodeCenterX;
    const deltaY = cursorPosition.y - nodeCenterY;
    
    // Calculate the angle in radians from the node to the cursor
    let angle = Math.atan2(deltaY, deltaX);
    
    // Convert radians to degrees and ensure the angle is within 0 to 360 degrees
    angle = ((angle * 180 / Math.PI) + 360) % 360;

    return angle;
  };

  const calculateWidth = (i, j) => {
    // Calculate the distance between the node and the cursor
    const nodeCenterX = i * 25 + 12.5;
    const nodeCenterY = j * 25 + 12.5;
    const distance = Math.sqrt(
      Math.pow(cursorPosition.x - nodeCenterX, 2) +
      Math.pow(cursorPosition.y - nodeCenterY, 2)
    );

    // Calculate the maximum distance diagonally across the grid
    const maxDistance = Math.sqrt(
      Math.pow(7 * 25, 2) +
      Math.pow(7 * 25, 2)
    );

    // Calculate the width based on the distance from the cursor
    const maxWidth = 36; // Maximum width of the node
    const minWidth = 3; // Minimum width of the node
    const width = maxWidth - ((maxWidth - minWidth) * (distance / maxDistance));

    return width;
  };

  return (
    <div>
      <div className='container'>
        <div className='nodeContainer'>
          {generateNodes()}
        </div>
      </div>
      <p className="mousePosition">
        Cursor Position: <span>{cursorPosition.x}, {cursorPosition.y}</span>
      </p>
    </div>
  );
}

export default NodeGrid;
